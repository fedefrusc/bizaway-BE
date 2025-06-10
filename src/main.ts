import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/', 
  });
  app.setViewEngine({
      engine: {
        handlebars: require('handlebars'),
      }, 
      templates: join(__dirname, '..', 'views'),
    });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
