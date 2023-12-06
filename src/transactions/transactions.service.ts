import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { Prisma, TransactionType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { GetTransactionsDto, TimeFilterDto } from './dto/get-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prismaService: PrismaService) {}

  async findAll(
    userId: string,
    transactionType: TransactionType,
    timeFilter: TimeFilterDto,
  ) {
    const whereClause: {
      userId: string;
      type?: TransactionType;
      transactionTime?: {
        gte?: string;
        lte?: string;
      };
    } = {
      userId,
    };

    if (transactionType) {
      whereClause.type = transactionType;
    }

    if (timeFilter && timeFilter.gte) {
      whereClause.transactionTime = {
        ...(whereClause.transactionTime || {}),
        gte: timeFilter.gte,
      };
    }

    if (timeFilter && timeFilter.lte) {
      whereClause.transactionTime = {
        ...(whereClause.transactionTime || {}),
        lte: timeFilter.lte,
      };
    }

    const transactions = await this.prismaService.transaction.findMany({
      where: whereClause,
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

  async getMonthlyStatistics(
    userId: string,
  ): Promise<{ monthlyStatistics: MonthlyStatistic[] }> {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const monthlyStatistics: MonthlyStatistic[] = [];

    for (let i = 0; i < 3; i++) {
      const year = currentMonth - i <= 0 ? currentYear - 1 : currentYear;
      const month = (currentMonth - i + 12) % 12 || 12;

      const startOfMonth = new Date(year, month - 1, 1);
      const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

      const transactions = await this.prismaService.transaction.findMany({
        where: {
          userId: userId,
          transactionTime: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
        include: {
          transactionCategory: true,
        },
      });

      const monthlyIncome = { totalAmount: 0 };
      const monthlyExpense = { totalAmount: 0, categories: [] };

      transactions.forEach((transaction) => {
        const type = transaction.type;

        if (type === 'INCOME') {
          const amount = transaction.amount;
          monthlyIncome.totalAmount += amount;
        } else {
          const amount = transaction.amount;
          const category = transaction.transactionCategory?.name ?? '';

          monthlyExpense.totalAmount += amount;

          const existingCategory = monthlyExpense.categories.find(
            (c) => c.name === category,
          );

          if (existingCategory) {
            existingCategory.totalAmount += transaction.amount;
          } else {
            monthlyExpense.categories.push({
              name: category,
              totalAmount: amount,
            });
          }
        }
      });

      monthlyStatistics.push({
        month: this.getMonthName(month),
        income: monthlyIncome,
        expense: monthlyExpense,
      });
    }

    return { monthlyStatistics };
  }

  private getMonthName(month: number): string {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[month - 1];
  }
}

export interface MonthlyStatistic {
  month: string;
  income: { totalAmount: number };
  expense: { totalAmount: number; categories: MonthlyCategory[] };
}

interface MonthlyCategory {
  name: string;
  totalAmount: number;
}
