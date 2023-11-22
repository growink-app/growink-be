import {
  IsOptional,
  IsString,
  IsNumber,
  Min,
  IsDate,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateYieldDto {
  @IsOptional()
  @IsString()
  product?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'Strawberry in Spring' })
  description?: string;

  @IsNumber()
  @Min(0)
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

  @IsOptional()
  @IsDateString()
  @ApiProperty({ default: '2023-11-21T00:00:00.000Z' })
  plantingTime?: Date;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ default: '2023-12-21T00:00:00.000Z' })
  harvestTime?: Date;
}
