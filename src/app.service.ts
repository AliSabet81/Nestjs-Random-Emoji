import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getEmoji(index?: number): string {
    const emojiList = this.getEmojis();
    const emojiIndex =
      typeof index !== `undefined`
        ? index
        : Math.floor(Math.random() * emojiList.length);
    return emojiList[emojiIndex];
  }

  getEmojis(): string[] {
    return [
      '👋',
      '👍',
      '👎',
      '👊',
      '👏',
      '👐',
      '👋',
      '👍',
      '👎',
      '👊',
      '👏',
      '👐',
    ];
  }
}
