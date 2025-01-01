import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'error'],
  });

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.use('/webhook', express.raw({ type: 'application/json' }));

  const port = 5000;
  const server = await app.listen(port);

  server.setTimeout(30000);

  Logger.log(`🚀 Server is running on http://localhost:${port}`, 'Bootstrap');

  app.use((req, res, next) => {
    Logger.log(
      `Incoming request: ${req.method} ${req.originalUrl}`,
      'RequestLogger',
    );
    next();
  });
}

bootstrap();
