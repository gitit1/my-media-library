import { Controller, Get, Query } from '@nestjs/common';

@Controller('tvdb')
export class TvdbController {
  @Get('search')
  searchSeries(@Query('query') query: string): any {
    // For now, return a placeholder response.
    return { message: `You searched for: ${query}` };
  }
}
