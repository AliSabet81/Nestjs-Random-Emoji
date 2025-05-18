import { Request } from 'express';
import { Observable } from 'rxjs';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    // const apiKey = request.header('x-api-key');
    const apiKey = request.headers?.['x-api-key'];
    if (apiKey !== 'SECRET' || !apiKey) {
      return false;
    }
    return true;
  }
}
