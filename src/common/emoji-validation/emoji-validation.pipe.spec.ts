import { BadRequestException } from '@nestjs/common';
import { EmojiValidationPipe } from './emoji-validation.pipe';

describe('EmojiValidationPipe', () => {
  const emojiPipe = new EmojiValidationPipe();

  it('should be defined', () => {
    expect(emojiPipe).toBeDefined();
  });

  it('should return undefined if no value is provided', () => {
    const result = emojiPipe.transform(undefined);
    expect(result).toBeUndefined();
  });

  it('should throw a BadRequest if the value is not a number', () => {
    const result = () => emojiPipe.transform('not a number');
    expect(result).toThrow(BadRequestException);
  });

  it('should throw a BadRequest if the value is less than 0', () => {
    const result = () => emojiPipe.transform('-1');
    expect(result).toThrow(BadRequestException);
  });

  it('should throw a BadRequest if the value is greater than 10', () => {
    const result = () => emojiPipe.transform('11');
    expect(result).toThrow(BadRequestException);
  });

  it('should return a number if the value is valid', () => {
    const result = emojiPipe.transform('4');
    expect(result).toBe(4);
  });
});
