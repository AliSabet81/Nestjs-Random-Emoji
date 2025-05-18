import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class BrowserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const userAgent = request.headers?.['user-agent'];
    const browserClient = userAgent ? userAgent.split(' ')[0] : 'Unknown';
    request.headers['browser'] = browserClient;
    console.log(
      `Interceptor: manipulated request with new browser header: ${request.headers['browser']}`,
    );
    return next.handle();
  }
}
