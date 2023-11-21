import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CategoriesService } from './categories.service';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, CategoriesService],
  exports: [],
})
export class TransactionsModule {}
