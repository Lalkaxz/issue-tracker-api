import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, PinoLogger } from 'nestjs-pino';
import { LoggingInterceptor } from './logger/logging.interceptor';

function createSwagger(app: INestApplication): void {
  const swaggerConfig = new DocumentBuilder()
        .setTitle('Issue Tracker API')
        .setDescription('Documentation REST API')
        .setVersion('1.0.0')
        .build();

  const document = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, document);
}


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);

  const logger = await app.resolve(PinoLogger);

  const port = config.getOrThrow<number>("port")
  const host = config.getOrThrow<string>("host")

  app.setGlobalPrefix(config.getOrThrow<string>("prefix"))

  createSwagger(app);

  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => console.log(`Server is running on ${host}:${port}`));
}
bootstrap();
