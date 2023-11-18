import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserMeController } from './user.me.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserMeController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
