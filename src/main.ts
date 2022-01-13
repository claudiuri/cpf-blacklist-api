import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  app.useGlobalPipes(new ValidationPipe());

  buildSwaggerDoc(app);

  await app.listen(3000);

  console.log(`App listening to port :${3000}`);
  console.log(`App running on: ${await app.getUrl()}`);
}
bootstrap();
