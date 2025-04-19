import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Series, Season, Episode, Subtitle, Path } from '@entities';
import { TheTVDBModule } from '@thetvdb';
import { SeriesModule } from '@series';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Series, Season, Episode, Subtitle, Path],
      synchronize: true,
    }),

    SeriesModule,
    TheTVDBModule,
  ],
})
export class AppModule {}
