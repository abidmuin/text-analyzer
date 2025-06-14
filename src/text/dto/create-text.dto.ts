import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTextDto {
  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content must not be empty' })
  @MaxLength(5000, { message: 'Content is too long. Maximum length is 5000 characters.' })
  content: string;
}
