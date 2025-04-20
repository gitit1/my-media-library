import { Controller, Post, Body } from '@nestjs/common';
import { PathsService } from './paths.service';
import { CreatePathDto } from './dto/create-path.dto';
import { Path } from '@entities';

@Controller('paths')
export class PathsController {
  constructor(private readonly pathsService: PathsService) {}

  @Post()
  async createPath(@Body() createPathDto: CreatePathDto): Promise<Path> {
    return this.pathsService.create(createPathDto);
  }
}
