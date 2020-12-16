import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const options = new DocumentBuilder()
    .setTitle('Dental Api')
    .setDescription(
      `Descripción total de nuestro servicio API de nuestra aplicacion dental, 
      enfocada para facilitar el trabajo de nuestros desarrolladores,
      en colaboración con: \n
      - Frank Cary Viveros
      - ...`,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
