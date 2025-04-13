import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { TheTVDBService } from '../services/thetvdb.service';
import { SeriesService } from '../services/series.service';

@Controller('thetvdb')
export class TheTVDBController {
  constructor(
    private readonly thetvdbService: TheTVDBService,
    private readonly seriesService: SeriesService,
  ) {}

  @Get('search')
  async searchSeries(@Query('query') query: string): Promise<any> {
    try {
      const results = await this.thetvdbService.searchSeries(query);

      if (!results.length) {
        throw new HttpException('No series found', HttpStatus.NOT_FOUND);
      }

      const resultsWithConflicts = await Promise.all(
        results.map(async (series) => {
          const exists = await this.seriesService.findByTheTVDBId(
            series.tvdb_id,
          );
          return {
            ...series,
            alreadyExists: !!exists,
          };
        }),
      );

      return resultsWithConflicts;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('extended/:id')
  async getExtendedSeries(@Param('id') id: string) {
    return this.thetvdbService.getExtendedSeriesDetails(parseInt(id));
  }

  @Get('extendedSeason/:id')
  async getSeasonEpisodes(@Param('id') id: number) {
    return this.thetvdbService.getSeasonEpisodes(id);
  }
}
