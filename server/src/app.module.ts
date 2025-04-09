import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TvdbController } from '@controllers';
import { Episode, MediaPath, Season, Series, Subtitle } from '@entities';
import { TypeOrmModule } from '@nestjs/typeorm';

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
      entities: [Series, Season, Episode, Subtitle, MediaPath],
      synchronize: true,
    }),
  ],
  controllers: [TvdbController /*, other controllers*/],
})
export class AppModule {}
