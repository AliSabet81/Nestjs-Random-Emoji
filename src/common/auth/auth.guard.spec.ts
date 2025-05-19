import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';

import { AuthGuard } from './auth.guard';
import { LoggerService } from '../../logger.service';

describe('AuthGuard', () => {
  const authGuard = new AuthGuard(new LoggerService());
  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it('should return true if the api key is valid', () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: { 'x-api-key': 'SECRET' },
          header: () => 'SECRET',
        }),
      }),
    });
    const result = authGuard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should return false if the api key is invalid', () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: { 'x-api-key': 'WRONG' },
          header: () => 'WRONG',
        }),
      }),
    });
    const result = authGuard.canActivate(context);
    expect(result).toBe(false);
  });

  it('should throw an false if the api key is not provided', () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: undefined,
          header: () => undefined,
        }),
      }),
    });
    const result = authGuard.canActivate(context);
    expect(result).toBe(false);
  });
});
