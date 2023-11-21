import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'Orange' })
  name: string;
}
