import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('✅ Starting the application...');
  app.enableCors({
    origin: '*', // Whitelist this origin
    methods: '*', // Specify allowed methods
    credentials: false, // Allow cookies or Authorization headers
  });

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);

  console.log('🚀 Application is running on: http://localhost:3000');
}
bootstrap();
