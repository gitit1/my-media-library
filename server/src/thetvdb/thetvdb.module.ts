import { Module } from '@nestjs/common';
import { TheTVDBService } from './thetvdb.service';
import { TheTVDBController } from './thetvdb.controller';
import { SeriesModule } from '../series/series.module';

@Module({
  imports: [SeriesModule],
  controllers: [TheTVDBController],
  providers: [TheTVDBService],
  exports: [TheTVDBService],
})
export class TheTVDBModule {}
