import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

function buildSwaggerDoc(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Cpf Blacklist API')
    .setVersion('1.0')
    .addTag('cpf')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const PORT = parseInt(configService.get('PORT')!) ?? 3000;

  app.useGlobalPipes(new ValidationPipe());

  buildSwaggerDoc(app);

  await app.listen(PORT);

  console.log(`App listening to port :${PORT}`);
  console.log(`App running on: ${await app.getUrl()}`);
}
bootstrap();
