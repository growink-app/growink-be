import {
  IsOptional,
  IsString,
  IsNumber,
  Min,
  IsDate,
  IsDateString,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateYieldDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ default: 'StrawberryID' })
  productId: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ default: '2023-11-21T00:00:00.000Z' })
  plantingTime: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ default: '2023-12-21T00:00:00.000Z' })
  harvestTime: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ default: 'Describe your product' })
  description: string;

  @IsOptional()
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
