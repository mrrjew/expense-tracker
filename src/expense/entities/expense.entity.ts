import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column('float')
  amount: number;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user?.expenses)
  user: User;
}
