import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpenseService {
  constructor(@InjectRepository(Expense) private expenseRepo:Repository<Expense>){}

  async create(createExpenseDto: CreateExpenseDto) {
    const expense = await this.expenseRepo.create(createExpenseDto);
    await this.expenseRepo.save(expense)
    return expense
  }

  findAll() {
    return this.expenseRepo.find();
  }

  async findByDate(filter: string, startDate?: Date, endDate?: Date) {
    const query = this.expenseRepo.createQueryBuilder('expense');

    switch (filter) {
        case "pastWeek":
            const pastWeek = new Date();
            pastWeek.setDate(pastWeek.getDate() - 7);
            query.where("expense.date >= :pastWeek", { pastWeek });
            break;

        case "lastMonth":
            const lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            query.where("expense.date >= :lastMonth", { lastMonth });
            break;

        case "lastThreeMonths":
            const lastThreeMonths = new Date();
            lastThreeMonths.setMonth(lastThreeMonths.getMonth() - 3);
            query.where("expense.date >= :lastThreeMonths", { lastThreeMonths });
            break;

        case "custom":
            if (startDate && endDate) {
                query.where("expense.date >= :startDate", { startDate: new Date(startDate) })
                     .andWhere("expense.date <= :endDate", { endDate: new Date(endDate) });
            }
            break;

        default:
            return []; 
    }

    return await query.getMany();
}


  findOne(id: number) {
    return this.expenseRepo.findOneBy({id});
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return this.expenseRepo.update(id,updateExpenseDto);
  }

  remove(id: number) {
    return this.expenseRepo.delete(id);
  }
}
