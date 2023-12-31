import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'http://growink-api.up.railway.app',
      'https://growink-api.up.railway.app',
      'http://growink.vercel.app',
      'https://growink.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Petaniku API')
    .setDescription('API Documentation of petaniku app')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = parseInt(process.env.PORT);
  await app.listen(port);

  console.info(`Petaniku API is running on port: ${port}...`);
}
bootstrap();
