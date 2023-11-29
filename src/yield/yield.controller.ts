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
import { YieldsService } from './yield.service';
import { CreateYieldDTO } from './dto/create-yield.dto';
import { UpdateYieldDto } from './dto/update-yield.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProductsService } from 'src/products/products.service';

@Controller('yields')
@ApiTags('yields')
export class YieldsController {
  constructor(
    private yieldsService: YieldsService,
    private productsService: ProductsService,
  ) {}

  @Get('products')
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getAllYields(@Request() req) {
    const userId = req.user.id;
    return this.yieldsService.getAllYields(userId);
  }

  @Get('statistics/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getAllYieldStatistics(@Request() req) {
    const userId = req.user.id;
    const yieldStatistics = await this.yieldsService.getAllYieldStatistics(
      userId,
    );
    return yieldStatistics;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getYieldById(@Request() req, @Param('id') yieldId: string) {
    const userId = req.user.id;
    return this.yieldsService.getYieldById(yieldId, userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createYield(@Request() req, @Body() createYieldDTO: CreateYieldDTO) {
    const userId = req.user.id;
    return await this.yieldsService.createYield(createYieldDTO, userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateYield(
    @Request() req,
    @Param('id') yieldId: string,
    @Body() updateYieldDTO: UpdateYieldDto,
  ) {
    const userId = req.user.id;
    return this.yieldsService.updateYield(userId, yieldId, updateYieldDTO);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deleteYield(@Request() req, @Param('id') yieldId: string) {
    const userId = req.user.id;
    return this.yieldsService.deleteYield(userId, yieldId);
  }
}
