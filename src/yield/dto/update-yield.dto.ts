import { IsOptional, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateYieldDto {
  @IsOptional()
  @IsString()
  product?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'Strawberry in Spring' })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ default: '300' })
  quantity?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'yourimage.com' })
  imageUrl?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'false' })
  isHarvested?: boolean;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ default: '30-nov-2020' })
  plantingTime?: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({ default: '30-nov-2021' })
  harvestTime?: Date;
}
