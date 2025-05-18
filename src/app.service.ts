import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getEmoji(): string {
    const emojiList = this.getEmojis();
    const randomIndex = Math.floor(Math.random() * emojiList.length);
    return emojiList[randomIndex];
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
