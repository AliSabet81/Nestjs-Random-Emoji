import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LoggerService } from './logger.service';
import { AuthGuard } from './common/auth/auth.guard';
import { LoggerMiddleware } from './common/logger/logger.middleware';
import { BrowserInterceptor } from './common/browser/browser.interceptor';
import { AllExceptionsFilter } from './common/all-exceptions/all-exceptions.filter';
import { TransformResponseInterceptor } from './common/transform-response/transform-response.interceptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    LoggerService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: BrowserInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
