import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService?.validate(email, password);
    console.log(user);

    if (!user) {
      throw new BadRequestException('user not found');
    }

    return user;
  }
}
