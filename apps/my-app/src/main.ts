import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MyAppModule } from './my-app.module';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(MyAppModule);
  const config = new DocumentBuilder()
    .setTitle('MonoRepo Example')
    .setDescription('The monorepo API description')
    .setVersion('1.0')
    .addTag('monorepo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
