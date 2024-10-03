import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
