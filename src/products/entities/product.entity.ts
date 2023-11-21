import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class ProductEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }
}
