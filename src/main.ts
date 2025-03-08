import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PinoLogger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { LoggingInterceptor } from './core/logger/logging.interceptor';

function createSwagger(app: INestApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Issue Tracker API')
    .setDescription('Documentation REST API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true
  });
  const config = app.get(ConfigService);

  const logger = await app.resolve(PinoLogger);

  const port = config.getOrThrow<string>('PORT');
  const host = config.getOrThrow<string>('HOST');

  app.setGlobalPrefix(config.getOrThrow<string>('PREFIX'));

  createSwagger(app);

  app.enableCors({ origin: config.getOrThrow<string>('ALLOWED_ORIGIN') });

  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () =>
    console.log(`Server is running on ${host}:${port}`)
  );
}
bootstrap();
