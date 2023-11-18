import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'John' })
  firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'Snow' })
  lastName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ default: '08123456789' })
  phoneNumber: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'yourimage.com' })
  imageUrl: string;
}
