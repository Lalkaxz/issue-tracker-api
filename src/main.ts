import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
        .setTitle('Issue Tracker API')
        .setDescription('Documentation REST API')
        .setVersion('1.0.0')
        .build()
    const document = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document)

    app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT ?? 3000, () => console.log(`Server is running on ${HOST}:${PORT}`));
}
bootstrap();
