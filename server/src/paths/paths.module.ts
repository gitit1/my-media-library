import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Path } from '@entities';
import { PathsService } from './paths.service';
import { PathsController } from './paths.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Path])],
  controllers: [PathsController],
  providers: [PathsService],
  exports: [PathsService],
})
export class PathsModule {}
