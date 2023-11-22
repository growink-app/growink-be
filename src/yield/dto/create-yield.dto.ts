import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Min,
  IsEnum,
  IsDate,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateYieldDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'Strawberry' })
  product: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ default: '2023-11-21T00:00:00.000Z' })
  plantTime: Date;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ default: '2023-12-21T00:00:00.000Z' })
  harvestTime: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'Describe your product' })
  description: string;

  @IsNotEmpty()
  @Min(0)
  @IsNumber()
  @ApiProperty({ default: '500' })
  amount: number;
}
