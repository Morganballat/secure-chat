import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //app.useWebSocketAdapter(new WsAdapter(app));
  app.enableCors({ origin: 'http://localhost:4200' });

  await app.listen(3000);
}
bootstrap();
