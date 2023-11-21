import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class YieldEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  isHarvested: boolean;

  @ApiProperty()
  plantingTime: Date;

  @ApiProperty()
  harvestTime: Date;

  constructor(partial: Partial<YieldEntity>) {
    Object.assign(this, partial);
  }
}
