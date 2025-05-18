import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EmojiValidationPipe implements PipeTransform {
  transform(value?: string) {
    if (!value) {
      return;
    }
    if (isNaN(Number(value))) {
      throw new BadRequestException(
        `Validation failed: ${value} is not a number`,
      );
    }
    if (Number(value) < 0 || Number(value) >= 10) {
      throw new BadRequestException(
        `Validation failed: ${value} is out of range`,
      );
    }
    return Number(value);
  }
}
