import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
import { DataGenerator } from './generate-Data';
import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from './auth/auth.filter';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pug = require('pug');

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: 400,
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('pug');
  //pug.registerPartials(join(__dirname, '..', 'views/partials'));

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });
  app.useGlobalFilters(new SupertokensExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Articles API')
    .setDescription('An API for Articles')
    .setVersion('0.1')
    .addTag('Article')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const generator = new DataGenerator();
  generator.generateData();

  const port = process.env.PORT || 3000;
  logger.log(`Application listening on port ${port}`);
  await app.listen(port);
}
bootstrap();
