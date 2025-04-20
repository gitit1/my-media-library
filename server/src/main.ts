import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
  });

  await app.listen(process.env.SERVER_PORT || 3001);
}
bootstrap();
