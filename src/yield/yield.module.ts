import { Module } from '@nestjs/common';
import { YieldsService } from './yield.service';
import { YieldsController } from './yield.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [YieldsController],
  providers: [YieldsService],
  exports: [],
})
export class YieldModule {}
