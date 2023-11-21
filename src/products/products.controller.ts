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
} from '@nestjs/common';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly yieldProductService: ProductsService) {}

  @Get()
  async getAllProducts() {
    return this.yieldProductService.getAllProducts();
  }
}
