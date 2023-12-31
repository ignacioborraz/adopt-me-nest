import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const PORT = configService.get("PORT")
  app.use(cookieParser())
  app.setGlobalPrefix("api")
  await app.listen(PORT);
}
bootstrap();
