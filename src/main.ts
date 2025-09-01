import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    origin:'https://frontend-ai-psi-al.vercel.app/chat' ,
  });
  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();
