import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TheTVDBService } from '../services/thetvdb.service';

@Controller('thetvdb')
export class TheTVDBController {
  constructor(private readonly thetvdbService: TheTVDBService) {}

  @Get('search')
  async searchSeries(@Query('query') query: string): Promise<any> {
    try {
      const results = await this.thetvdbService.searchSeries(query);

      if (!results.length) {
        throw new HttpException('No series found', HttpStatus.NOT_FOUND);
      }

      return results;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
