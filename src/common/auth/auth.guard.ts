import { Request } from 'express';
import { Observable } from 'rxjs';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { LoggerService } from '../../logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly logger: LoggerService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.info('Guard: checking authentication');
    const request = context.switchToHttp().getRequest<Request>();
    // const apiKey = request.header('x-api-key');
    const apiKey = request.headers?.['x-api-key'];
    if (apiKey !== 'SECRET' || !apiKey) {
      return false;
    }
    this.logger.info('Guard: authentication successful');
    return true;
  }
}
