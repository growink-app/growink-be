import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ default: 'user@example.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ default: 'password' })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'John' })
  firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'Snow' })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: '08123456789' })
  phoneNumber: string;
}
