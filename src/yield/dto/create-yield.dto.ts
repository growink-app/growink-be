import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateYieldDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'Strawberry' })
  product: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ default: '1-nov-2023' })
  plantTime: Date;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ default: '1-dec-2023' })
  harvestTime: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'red strawberry from ohio' })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ default: '500' })
  amount: number;
}
