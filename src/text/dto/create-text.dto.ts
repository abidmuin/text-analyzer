import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTextDto {
  @ApiProperty({
    description: 'The text content to analyze',
    example:
      'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.',
  })
  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content must not be empty' })
  @MaxLength(5000, {
    message: 'Content is too long. Maximum length is 5000 characters.',
  })
  content: string;
}
