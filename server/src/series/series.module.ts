import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Series } from '../entities/series.entity';
import { Season } from '../entities/season.entity';
import { Episode } from '../entities/episode.entity';

import { SeriesService } from './series.service';

@Module({
  imports: [TypeOrmModule.forFeature([Series, Season, Episode])],
  providers: [SeriesService],
  controllers: [],
  exports: [SeriesService],
})
export class SeriesModule {}
