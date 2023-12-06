import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Request,
  Body,
  Param,
  Query,
  UseGuards,
  Patch,
} from '@nestjs/common';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
//import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TransactionType } from '@prisma/client';
import { CategoriesService } from './categories.service';
import { MonthlyStatistic } from './transactions.service';
import { GetTransactionsDto } from './dto/get-transaction.dto';

@Controller('transactions')
@ApiTags('transactions')
export class TransactionsController {
  constructor(
    private transactionsService: TransactionsService,
    private categoriesService: CategoriesService,
  ) {}

  @Get('categories')
  async findAllCategories() {
    return await this.categoriesService.findAll();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({
    name: 'type',
    required: false,
    type: String,
    description: 'Search transactions by type',
  })
  async findAll(
    @Request() req,
    @Query('type') type?: TransactionType,
    @Body()
    filterDto?: GetTransactionsDto,
  ) {
    const userId = req.user.id;
    const transactions = await this.transactionsService.findAll(
      userId,
      type,
      filterDto.timeFilter,
    );
    return transactions;
    //return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Request() req, @Param('id') transactionId: string) {
    const userId = req.user.id;
    return await this.transactionsService.findOne(transactionId, userId);
    //return new UserEntity(await this.usersService.findOne(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(
    @Request() req,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    const userId = req.user.id;
    return await this.transactionsService.create(userId, createTransactionDto);
    //return new UserEntity(await this.usersService.findOne(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Request() req,
    @Param('id') transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    const userId = req.user.id;
    return await this.transactionsService.update(
      transactionId,
      userId,
      updateTransactionDto,
    );
    //return new UserEntity(await this.usersService.update(id, updateUserDto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async delete(@Request() req, @Param('id') transactionId: string) {
    const userId = req.user.id;
    return this.transactionsService.delete(transactionId, userId);
  }

  @Get('statistics/summary')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getStatistics(@Request() req) {
    const userId = req.user.id;
    return await this.transactionsService.getMonthlyStatistics(userId);
  }
}

// todos:
// 1. time filter
// 2. handle invalid category id
