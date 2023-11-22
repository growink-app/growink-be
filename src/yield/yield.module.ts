import { Module } from '@nestjs/common';
import { YieldsService } from './yield.service';
import { YieldsController } from './yield.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [PrismaModule, ProductsModule],
  controllers: [YieldsController],
  providers: [YieldsService],
  exports: [],
})
export class YieldModule {}
