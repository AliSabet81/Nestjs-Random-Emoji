import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  info(message: string) {
    console.log(`[INFO] ${message}`);
  }
}
