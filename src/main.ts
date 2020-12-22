import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';
import { config } from 'aws-sdk';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useStaticAssets(
    join('node_modules', 'swagger-ui-themes', 'themes', '3.x'),
  );

  const options = new DocumentBuilder()
    .setTitle('Dental Api')
    .setDescription(
      `Descripción total de nuestro servicio API de nuestra aplicacion dental, 
      enfocada para facilitar el trabajo de nuestros desarrolladores,`,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Dental Api',
    //customCssUrl: '/theme-material.css',
  });

  const configService = app.get<AppConfigService>(AppConfigService);

  config.update({
    accessKeyId: configService.awsAccessKeyId,
    secretAccessKey: configService.awsSecretAccessKey,
    region: configService.awsRegion,
  });
  await app.listen(configService.port, '0.0.0.0');
}
bootstrap();
