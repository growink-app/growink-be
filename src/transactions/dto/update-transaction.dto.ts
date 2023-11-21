import {
  IsOptional,
  IsString,
  IsNumber,
  Min,
  IsDate,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTransactionDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiProperty({ default: '10000' })
  amount: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'Describe your transaction...' })
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'categoryId' })
  transactionCategoryId: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ default: '2023-11-21T00:00:00.000Z' })
  transactionTime: string;
}
