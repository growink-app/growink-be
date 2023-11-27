import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  Min,
  IsEnum,
  IsDate,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export class CreateTransactionDto {
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty({ default: '10000' })
  amount: number;

  @IsEnum(TransactionType, { each: true })
  @IsNotEmpty()
  @ApiProperty({ default: 'INCOME' })
  type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'Describe your transaction...' })
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'categoryId' })
  transactionCategoryId: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ default: '2023-11-21T00:00:00.000Z' })
  transactionTime: string;
}
