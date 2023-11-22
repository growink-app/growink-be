import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Yield } from '@prisma/client';
import { CreateYieldDTO } from './dto/create-yield.dto';
import { UpdateYieldDto } from './dto/update-yield.dto';

@Injectable()
export class YieldsService {
  constructor(private readonly prisma: PrismaService) {}

  async createYield(createYieldDTO: CreateYieldDTO): Promise<Yield> {
    const { product, plantTime, harvestTime, description, amount } =
      createYieldDTO;
    return this.prisma.yield.create({
      data: {
        product,
        plantTime,
        harvestTime,
        description,
        amount,
      },
    });
  }

  async getAllYields(): Promise<Yield[]> {
    return this.prisma.yield.findMany();
  }

  async getYieldById(id: string): Promise<Yield> {
    const yieldData = await this.prisma.yield.findUnique({
      where: { id },
    });
    if (!yieldData) {
      throw new NotFoundException('Yield not found');
    }
    return yieldData;
  }

  async updateYield(
    id: string,
    updateYieldDTO: UpdateYieldDto,
  ): Promise<Yield> {
    const yieldData = await this.getYieldById(id);
    return this.prisma.yield.update({
      where: { id },
      data: updateYieldDTO,
    });
  }

  async deleteYield(id: string): Promise<void> {
    const yieldData = await this.getYieldById(id);
    await this.prisma.yield.delete({
      where: { id },
    });
  }
}
