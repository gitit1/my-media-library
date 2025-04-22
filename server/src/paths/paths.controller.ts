import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Path } from '@entities';
import { PathsService } from './paths.service';
import { CreatePathDto, UpdatePathDto } from 'src/paths/dto';

@Controller('paths')
export class PathsController {
  constructor(private readonly pathsService: PathsService) {}

  @Post()
  async createPath(@Body() createPathDto: CreatePathDto): Promise<Path> {
    return this.pathsService.create(createPathDto);
  }

  @Get()
  async getAllPaths(): Promise<Path[]> {
    return this.pathsService.findAll();
  }

  @Patch(':id')
  async updatePath(
    @Param('id') id: string,
    @Body() updatePathDto: UpdatePathDto,
  ): Promise<Path | null> {
    return this.pathsService.update(parseInt(id), updatePathDto);
  }

  @Delete(':id')
  async deletePath(@Param('id') id: string): Promise<void> {
    return this.pathsService.delete(parseInt(id));
  }
}
