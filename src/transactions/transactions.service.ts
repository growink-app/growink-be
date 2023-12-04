import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { Prisma, TransactionType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prismaService: PrismaService) {}

  async findAll(userId: string, transactionType: TransactionType) {
    if (transactionType) {
      const transactions = await this.prismaService.transaction.findMany({
        where: {
          userId: userId,
          type: transactionType,
        },
        orderBy: [
          {
            transactionTime: 'desc',
          },
        ],
        include: {
          transactionCategory: true,
        },
      });
      return transactions;
    } else {
      const transactions = await this.prismaService.transaction.findMany({
        where: {
          userId: userId,
        },
        orderBy: [
          {
            transactionTime: 'desc',
          },
        ],
        include: {
          transactionCategory: true,
        },
      });
      return transactions;
    }
  }

  async findOne(transactionId: string, userId: string) {
    const transaction = await this.prismaService.transaction.findUnique({
      where: { id: transactionId },
      include: {
        transactionCategory: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException(
        `Transaction with id: '${transactionId}' does not exist`,
      );
    }

    if (transaction.userId !== userId) {
      throw new ForbiddenException(
        "You don't have permission to access this transaction",
      );
    }

    return transaction;
  }

  async create(userId: string, data) {
    if (data.type === 'INCOME') {
      data.transactionCategoryId = null;
    }

    const transaction = await this.prismaService.transaction.create({
      data: {
        amount: data.amount,
        type: data.type,
        description: data.description,
        transactionCategoryId: data.transactionCategoryId,
        userId: userId,
        transactionTime: new Date(data.transactionTime),
      },
      include: {
        transactionCategory: true,
      },
    });

    return transaction;
  }

  async update(transactionId: string, userId: string, data) {
    const transaction = await this.prismaService.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new NotFoundException(
        `Transaction with id: "${transactionId}" does not exist`,
      );
    }

    if (transaction.userId !== userId) {
      throw new ForbiddenException(
        "You don't have permission to access this transaction",
      );
    }

    if (transaction.type === 'INCOME') {
      data.transactionCategoryId = null;
    }

    try {
      const updatedTransaction = await this.prismaService.transaction.update({
        where: { id: transactionId },
        data: {
          amount: data.amount,
          description: data.description,
          transactionTime: data.transactionTime,
          transactionCategoryId: data.transactionCategoryId,
        },
        include: {
          transactionCategory: true,
        },
      });
      return updatedTransaction;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            `The "${error.meta.target}" is invalid or already taken`,
          );
        }
      }
      throw error;
    }
  }

  async delete(transactionId: string, userId: string) {
    const transaction = await this.prismaService.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new NotFoundException(
        `Transaction with id: "${transactionId}" does not exist`,
      );
    }

    if (transaction.userId !== userId) {
      throw new ForbiddenException(
        "You don't have permission to delete this transaction",
      );
    }

    try {
      await this.prismaService.transaction.delete({
        where: { id: transactionId },
      });
      return { message: 'Transaction deleted successfully' };
    } catch (error) {
      throw new Error(`Unable to delete transaction: ${error.message}`);
    }
  }
}
