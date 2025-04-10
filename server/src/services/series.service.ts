import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Series } from '../entities/series.entity';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series)
    private readonly seriesRepository: Repository<Series>,
  ) {}

  async findByTheTVDBId(thetvdb_id: number): Promise<Series | null> {
    return await this.seriesRepository.findOne({ where: { thetvdb_id } });
  }
}
