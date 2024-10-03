import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtGuard } from './auth/guards/jwt.guard';
import JwtStrategy from './auth/strategies/jwt.strategy';
import LocalStrategy from './auth/strategies/passport.strategy';
import { AuthService } from './auth/auth.service';
import { User } from './auth/entities/user.entity';
import { ExpenseModule } from './expense/expense.module';
import { Expense } from './expense/entities/expense.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      logging:true
    }),

    AuthModule,
    TypeOrmModule.forFeature([User,Expense]),
    ConfigModule.forRoot({ isGlobal: true }),
    ExpenseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: JwtGuard,
    },
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    JwtStrategy,
    LocalStrategy,
    AuthService,
  ],
})
export class AppModule {}
