import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { TransactionsModule } from './transactions/transactions.module';
import { YieldModule } from './yield/yield.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProductsModule,
    TransactionsModule,
    YieldModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
