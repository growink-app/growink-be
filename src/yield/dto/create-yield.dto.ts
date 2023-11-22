import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Min,
  IsEnum,
  IsDate,
  IsDateString,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateYieldDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'StrawberryID' })
  productId: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ default: '2023-11-21T00:00:00.000Z' })
  plantingTime: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ default: '2023-12-21T00:00:00.000Z' })
  harvestTime: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'Describe your product' })
  description: string;

  @IsNotEmpty()
  @Min(0)
  @IsNumber()
  @ApiProperty({ default: '500' })
  quantity: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ default: 'yourimage.com' })
  imageUrl: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ default: 'false' })
  isHarvested: boolean;
}
