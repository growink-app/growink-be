import { IsOptional, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'John' })
  name: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ default: 'user@example.com' })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ default: '08123456789' })
  phoneNumber: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'yourimage.com' })
  imageUrl: string;
}
