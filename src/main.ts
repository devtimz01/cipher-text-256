import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerInstance } from './utils/logs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           
      forbidNonWhitelisted: true,
      transform: true,  
      transformOptions: {enableImplicitConversion: true }      
    })
  );
  await app.listen(3000);
   app.enableCors({origin:'http://localhost:5173',credentials:true,allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
    preflightContinue: false,
    optionsSuccessStatus: 204,})
  //Logger.info('app starting...')
}

bootstrap();
