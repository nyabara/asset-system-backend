// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// //import * as cookieParser from 'cookie-parser';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, { abortOnError: false });

//     // Enable cookie parsing middleware
//     //app.use(cookieParser());

//   const config = new DocumentBuilder()
//     .setTitle('API Documentation')
//     .setDescription('The API description for Ene-System App')
//     .setVersion('1.0')
//     .addTag('cats')
//     .build();

//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document);

//   await app.listen(process.env.PORT ?? 3000);
// }

// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });

  // Enable CORS for Azure compatibility
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description for Ene-System App')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Use Azure-assigned port
  const PORT = process.env.PORT || 8080;
  await app.listen(PORT);
  console.log(` Server running on port ${PORT}`);
}

bootstrap();
