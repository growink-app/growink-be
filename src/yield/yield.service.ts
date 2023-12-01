import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Yield } from '@prisma/client';
import { CreateYieldDTO } from './dto/create-yield.dto';
import { UpdateYieldDto } from './dto/update-yield.dto';

@Injectable()
export class YieldsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllYields(userId: string): Promise<Yield[]> {
    return this.prismaService.yield.findMany({
      where: {
        userId: userId,
      },
      orderBy: [
        {
          plantingTime: 'desc',
        },
      ],
      include: {
        product: true,
      },
    });
  }

  async getYieldById(yieldId: string, userId: string): Promise<Yield> {
    const yieldData = await this.prismaService.yield.findUnique({
      where: { id: yieldId },
      include: {
        product: true,
      },
    });

    if (!yieldData) {
      throw new NotFoundException('Yield not found');
    }

    if (yieldData.userId !== userId) {
      throw new ForbiddenException(
        "You don't have permission to access this yield",
      );
    }

    return yieldData;
  }

  async getAllYieldStatistics(
    userId: string,
  ): Promise<{ [key: string]: number }> {
    const userYields = await this.prismaService.yield.findMany({
      where: {
        userId: userId,
      },
      select: {
        productId: true,
        quantity: true,
      },
    });

    const yieldQuantityMap: { [key: string]: number } = {};

    userYields.forEach((yieldItem) => {
      if (yieldQuantityMap[yieldItem.productId]) {
        yieldQuantityMap[yieldItem.productId] += yieldItem.quantity || 0;
      } else {
        yieldQuantityMap[yieldItem.productId] = yieldItem.quantity || 0;
      }
    });

    return yieldQuantityMap;
  }

  async getMonthlyStatistics(
    userId: string,
    year: number,
    month: number,
  ): Promise<{ [key: string]: number }> {
    const userYields = await this.prismaService.yield.findMany({
      where: {
        userId,
        AND: {
          harvestTime: {
            gte: new Date(year, month - 1, 1),
            lt: new Date(year, month, 1),
          },
        },
      },
      select: {
        productId: true,
        quantity: true,
      },
    });

    const monthlyStatistics: { [key: string]: number } = {};

    userYields.forEach((yieldItem) => {
      if (monthlyStatistics[yieldItem.productId]) {
        monthlyStatistics[yieldItem.productId] += yieldItem.quantity || 0;
      } else {
        monthlyStatistics[yieldItem.productId] = yieldItem.quantity || 0;
      }
    });

    return monthlyStatistics;
  }

  async createYield(
    createYieldDTO: CreateYieldDTO,
    userId: string,
  ): Promise<Yield> {
    const {
      productId,
      plantingTime,
      harvestTime,
      description,
      quantity,
      imageUrl,
      isHarvested,
    } = createYieldDTO;

    const newYield = await this.prismaService.yield.create({
      data: {
        userId,
        productId,
        plantingTime,
        harvestTime,
        description,
        quantity,
        imageUrl,
        isHarvested,
      },
    });

    return newYield;
  }

  async updateYield(
    userId: string,
    yieldId: string,
    updateYieldDTO: UpdateYieldDto,
  ): Promise<Yield> {
    const updatedYield = await this.getYieldById(yieldId, userId);

    if (!updatedYield) {
      throw new NotFoundException(`Yield with id: "${yieldId}" does not exist`);
    }

    if (updatedYield.userId !== userId) {
      throw new ForbiddenException(
        "You don't have permission to access this yield",
      );
    }

    return this.prismaService.yield.update({
      where: { id: yieldId },
      data: updateYieldDTO,
    });
  }

  async deleteYield(userId: string, yieldId: string): Promise<void> {
    const deletedData = await this.getYieldById(yieldId, userId);

    if (!deletedData) {
      throw new NotFoundException(`Yield with id: "${yieldId}" does not exist`);
    }

    if (deletedData.userId !== userId) {
      throw new ForbiddenException(
        "You don't have permission to access this yield",
      );
    }
    await this.prismaService.yield.delete({
      where: { id: yieldId },
    });
  }
}
