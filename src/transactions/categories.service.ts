import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    const types = await this.prismaService.transactionCategory.findMany();
    return types;
  }
}
