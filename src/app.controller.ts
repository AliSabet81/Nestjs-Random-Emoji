import { Request } from 'express';
import { Controller, Get, Query, Req } from '@nestjs/common';

import { AppService } from './app.service';
import { EmojiValidationPipe } from './common/emoji-validation/emoji-validation.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getEmoji(
    @Req() req: Request,
    @Query('index', EmojiValidationPipe) index?: number,
  ): { emoji: string; browser?: string } {
    return {
      emoji: this.appService.getEmoji(index),
      browser: req.headers.browser?.toString(),
    };
  }
}
