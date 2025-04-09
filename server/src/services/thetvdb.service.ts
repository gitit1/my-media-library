import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TheTVDBService {
  private readonly logger = new Logger(TheTVDBService.name);
  private token: string;

  async authenticate() {
    const apiKey = process.env.THETVDB_API_KEY;
    const pin = process.env.THETVDB_SUBSCRIBER_PIN;
    this.logger.log(`Using TheTVDB API Key: '${apiKey}'`);

    try {
      const response = await axios.post(
        'https://api4.thetvdb.com/v4/login', // ✅ Updated to v4 endpoint
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
        `https://api4.thetvdb.com/v4/search?query=${encodeURIComponent(query)}`,
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
        return response.data.data;
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

  async getSeriesDetails(seriesId: number) {
    if (!this.token) {
      this.logger.log(`No token found — calling authenticate()`);
      await this.authenticate();
    }

    this.logger.log(`Fetching details for series ID: ${seriesId}`);

    const response = await axios.get(
      `https://api4.thetvdb.com/v4/series/${seriesId}`,
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

    if (response.data?.data) {
      this.logger.log(`Series details fetched for ID: ${seriesId}`);
      return response.data.data;
    } else {
      this.logger.warn(`No details found for series ID: ${seriesId}`);
      return null;
    }
  }
}
