import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- SWAGGER CONFIGURATION ---
  const config = new DocumentBuilder()
    .setTitle('WSpeedrun Run Service')
    .setDescription('The API documentation for speedrun submissions')
    .setVersion('1.0')
    .addBearerAuth() // This adds the "Authorize" button for your JWT tokens!
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 'api' is the URL path
  // -----------------------------

  await app.listen(3000);
}
bootstrap();