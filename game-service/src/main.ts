import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Tambahkan ini

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  // --- KONFIGURASI SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('WSpeedrun - Game Service')
    .setDescription('Dokumentasi API untuk Game dan Kategori Service (Port 3001)')
    .setVersion('1.0')
    .addBearerAuth() // Memunculkan tombol "Authorize" untuk input token JWT di UI
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Akses di /api/docs
  // ---------------------------

  // Pastikan port 3001 sesuai spesifikasi dokumen Game Service
  await app.listen(3001); 
}
bootstrap();