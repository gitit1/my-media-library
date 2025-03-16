import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes the config available everywhere
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
