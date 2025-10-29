import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
//import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { abortOnError: false });

    // Enable cookie parsing middleware
    //app.use(cookieParser());
    app.enableCors();
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
      prefix: '/uploads/', // so you can access via /uploads/assets/filename.jpg
    });

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description for Asset-System App')
    .setVersion('1.0')
    .addTag('Assets')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  //await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  //await app.listen(process.env.PORT || 8080, '0.0.0.0');

}

bootstrap();
