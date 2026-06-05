import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // buang field yang tidak ada di DTO
      forbidNonWhitelisted: true, // error jika ada field tambahan
      transform: true, // auto transform parameter
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('WSpeedrun - Game Service')
    .setDescription(
      'Dokumentasi API untuk Game dan Category Service (Port 3001)',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3001);

  console.log(
    `Game Service is running on: http://localhost:3001`,
  );
  console.log(
    `Swagger Documentation: http://localhost:3001/api/docs`,
  );
}

bootstrap();