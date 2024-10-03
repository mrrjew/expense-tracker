import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Expense } from './entities/expense.entity';

@Module({
  imports:[
      TypeOrmModule.forFeature([User,Expense]),
    ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
