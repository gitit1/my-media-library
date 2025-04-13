import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { SeriesService } from './series.service';

@Injectable()
export class TheTVDBService {
  private readonly logger = new Logger(TheTVDBService.name);
  private token: string;

  constructor(
    private readonly seriesService: SeriesService, // THIS must exist
  ) {}

  async authenticate() {
    const apiKey = process.env.THETVDB_API_KEY;
    const pin = process.env.THETVDB_SUBSCRIBER_PIN;
    this.logger.log(`Using TheTVDB API Key: '${apiKey}'`);

    try {
      const response = await axios.post(
        `${process.env.THETVDB_API_URL}/login`, // ✅ Updated to v4 endpoint
        {
          apikey: apiKey,
          pin: pin,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          httpsAgent: new (require('https').Agent)({
            rejectUnauthorized: false, // ✅ For development only
          }),
          validateStatus: (status) => status < 500,
        },
      );

      this.token = response.data?.data?.token; // ✅ Adjusted to new v4 response format
      this.logger.log(`Authenticated with TheTVDB. Token: ${this.token}`);
    } catch (error) {
      this.logger.error(
        `Authentication error: ${error.response?.data?.message || error.message}`,
      );
    }
  }

  async searchSeries(query: string) {
    if (!this.token) {
      this.logger.log(`No token found — calling authenticate()`);
      await this.authenticate();
    }

    this.logger.log(`Searching for series: ${query}`);

    try {
      const response = await axios.get(
        `${process.env.THETVDB_API_URL}/search?query=${encodeURIComponent(query)}&type=series`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json',
          },
          httpsAgent: new (require('https').Agent)({
            rejectUnauthorized: false,
          }),
          validateStatus: (status) => status < 500,
        },
      );

      if (response.status !== 200) {
        this.logger.warn(
          `TheTVDB search returned status ${response.status}: ${response.data?.message}`,
        );
        throw new Error(response.data?.message || 'TVDB Search error');
      }

      if (response.data?.data) {
        this.logger.log(
          `Found ${response.data.data.length} matches for query: "${query}"`,
        );
        const rawResults = response.data?.data || [];

        const mappedResults = await Promise.all(
          rawResults.map(async (item) => {
            const thetvdb_id = item.tvdb_id || item.id;

            // Check if series exists in DB
            const exists = await this.seriesService.findByTheTVDBId(thetvdb_id); // inject this if needed

            return {
              thetvdb_id,
              name: {
                en: item.name,
                he: item.translations?.heb || item.name,
              },
              summary: {
                en: item.overviews?.eng || item.overview,
                he: item.overviews?.heb || item.overview,
              },
              year: item.year || null,
              poster: item.image_url || '', // or pick a default artwork if available later
              status: item.status || '',
              alreadyExists: !!exists,
            };
          }),
        );
        return mappedResults;
      } else {
        this.logger.warn(`No matches found for query: "${query}"`);
        return [];
      }
    } catch (error) {
      this.logger.error(
        `Error searching for series "${query}": ${
          error.response?.data?.message || error.message
        }`,
      );
      throw error;
    }
  }

  async getExtendedSeriesDetails(seriesId: number): Promise<any> {
    if (!this.token) {
      await this.authenticate();
    }

    try {
      const response = await axios.get(
        `${process.env.THETVDB_API_URL}/series/${seriesId}/extended?meta=translations`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json',
          },
          httpsAgent: new (require('https').Agent)({
            rejectUnauthorized: false,
          }),
        },
      );

      const data = response.data.data;
      const seasonIds = data.seasons?.map((s: any) => s.id) || [];

      const enrichedSeasons: {
        seasonId: number;
        seasonNumber: number;
        episodeCount: number;
        episodes: {
          episodeId: number;
          episodeNumber: number;
          title: string;
          overview?: string;
          airDate?: string;
        }[];
      }[] = [];

      for (const seasonId of seasonIds) {
        const seasonData = await this.getSeasonEpisodes(seasonId);

        const episodes =
          seasonData.episodes?.map((ep: any) => ({
            episodeId: ep.id,
            episodeNumber: ep.number,
            title: {
              en: ep.name,
              he:
                ep.translations?.nameTranslations?.find(
                  (t) => t.language === 'heb',
                )?.name || ep.name,
            },
            overview: {
              en: ep.overview,
              he:
                ep.translations?.overviewTranslations?.find(
                  (t) => t.language === 'heb',
                )?.overview || ep.overview,
            },
            airDate: ep.airDate,
          })) || [];

        enrichedSeasons.push({
          seasonId,
          seasonNumber: seasonData.number,
          episodeCount: episodes.length,
          episodes,
        });
      }

      return {
        thetvdb_id: data.id,
        seriesName: {
          en:
            data.translations?.nameTranslations?.find(
              (t) => t.language === 'eng',
            )?.name || data.name,
          he:
            data.translations?.nameTranslations?.find(
              (t) => t.language === 'heb',
            )?.name || data.name,
        },
        summary: {
          en:
            data.translations?.overviewTranslations?.find(
              (t) => t.language === 'eng',
            )?.overview || data.overview,
          he:
            data.translations?.overviewTranslations?.find(
              (t) => t.language === 'heb',
            )?.overview || data.overview,
        },
        seriesStatus: data.status.name,
        genre: data.genres.map((g: any) => g.name) || [],
        network: data.originalNetwork.name || '',
        firstAired: data.firstAired || null,
        lastAired: data.lastAired || null,
        originalCountry: data.originalCountry || null,
        year: data.year || null,
        posters: data.artworks?.filter((a: any) => a.type === 'poster') || [],
        banners: data.artworks?.filter((a: any) => a.type === 'series') || [],
        icons:
          data.artworks?.filter(
            (a: any) => a.type === 'clear' || a.type === 'icon',
          ) || [],
        seasons: enrichedSeasons,
      };

      // Full response (if full === true)
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;
      this.logger.error(`TVDB extended fetch failed [${status}]: ${message}`);
      throw new Error(message || 'Could not fetch extended series data');
    }
  }

  async getSeasonEpisodes(seasonId: number): Promise<any> {
    if (!this.token) {
      await this.authenticate();
    }

    try {
      const response = await axios.get(
        `${process.env.THETVDB_API_URL}/seasons/${seasonId}/extended`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json',
          },
          httpsAgent: new (require('https').Agent)({
            rejectUnauthorized: false,
          }),
        },
      );

      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      this.logger.error(
        `Failed to fetch season ${seasonId} episodes: ${message}`,
      );
      throw new Error(message || 'Could not fetch season episodes');
    }
  }

  async getEpisodesForSeasons(seasonIds: number[]): Promise<
    {
      seasonId: number;
      seasonNumber: number;
      episodeCount: number;
      episodes: {
        episodeId: number;
        episodeNumber: number;
        title: string;
        overview?: string;
        airDate?: string;
      }[];
    }[]
  > {
    const results: {
      seasonId: number;
      seasonNumber: number;
      episodeCount: number;
      episodes: {
        episodeId: number;
        episodeNumber: number;
        title: string;
        overview?: string;
        airDate?: string;
      }[];
    }[] = [];

    for (const seasonId of seasonIds) {
      const seasonData = await this.getSeasonEpisodes(seasonId);

      const episodes =
        seasonData.episodes?.map((ep: any) => ({
          episodeId: ep.id,
          episodeNumber: ep.number,
          title: ep.name,
          overview: ep.overview,
          airDate: ep.airDate,
        })) || [];

      results.push({
        seasonId,
        seasonNumber: seasonData.number,
        episodeCount: episodes.length,
        episodes,
      });
    }

    return results;
  }
}
