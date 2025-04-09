// src/controllers/tvdb.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { TheTVDBService } from '../services/thetvdb.service';

@Controller('thetvdb')
export class TheTVDBController {
  constructor(private readonly thetvdbService: TheTVDBService) {}

  @Get('search')
  async searchSeries(@Query('query') query: string): Promise<any> {
    return await this.thetvdbService.searchSeries(query);
  }
}
