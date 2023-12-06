import {
  IsDateString,
  IsISO8601,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TimeFilterDto {
  @IsDateString()
  @IsOptional()
  @ApiProperty({ default: '2023-12-01T00:00:00.000Z' })
  gte?: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ default: '2023-12-31T23:59:59.999Z' })
  lte?: string;
}

export class GetTransactionsDto {
  @ValidateNested()
  @Type(() => TimeFilterDto)
  @IsOptional()
  @ApiProperty({ type: TimeFilterDto })
  timeFilter?: TimeFilterDto;
}
