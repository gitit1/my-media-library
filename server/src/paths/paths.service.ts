import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Path } from '@entities';
import { CreatePathDto } from './dto/create-path.dto';

@Injectable()
export class PathsService {
  constructor(
    @InjectRepository(Path)
    private readonly pathRepository: Repository<Path>,
  ) {}

  async create(createPathDto: CreatePathDto): Promise<Path> {
    const newPath = this.pathRepository.create(createPathDto);
    return this.pathRepository.save(newPath);
  }

  async findAll(): Promise<Path[]> {
    return this.pathRepository.find({
      order: { name: 'ASC' },
    });
  }
}
