import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AuthGuard } from './common/auth/auth.guard';
import { BrowserInterceptor } from './common/browser/browser.interceptor';
import { AllExceptionsFilter } from './common/all-exceptions/all-exceptions.filter';
import { TransformResponseInterceptor } from './common/transform-response/transform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new AuthGuard());
  app.useGlobalInterceptors(new BrowserInterceptor());
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
