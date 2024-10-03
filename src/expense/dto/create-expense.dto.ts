import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";
import { Transform } from 'class-transformer';

export class CreateExpenseDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsInt()
    amount: number;

    @Transform(({ value }) => {
        const [month, day, year] = value.split('-');
        return new Date(`${year}-${month}-${day}`);
    })
    @IsDate()
    date: Date;
}
