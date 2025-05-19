import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new AuthGuard());
  // app.useGlobalInterceptors(new BrowserInterceptor());
  // app.useGlobalInterceptors(new TransformResponseInterceptor());
  // app.useGlobalFilters(new AllExceptionsFilter());
  const port = process.env.PORT ?? 3000;
  const host = process.env.HOST ?? '0.0.0.0';
  await app.listen(port, host);
  console.log(`Server is running on port ${port} and host ${host}`);
}

bootstrap();
