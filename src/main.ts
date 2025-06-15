import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger('application', {
      json: true,
      colors: true,
    }),
  });

  const config = new DocumentBuilder()
    .setTitle('Text Analyzer API')
    .setDescription('API for analyzing and managing texts')
    .setVersion('1.0')
    .addTag('texts')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
