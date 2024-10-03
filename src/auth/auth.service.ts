import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string) {
    const user = await this.userRepo.findOneBy({ email });

    if (!user) {
      throw new NotFoundException();
    }

    const isPass = await user.comparePassword(password);

    if (!isPass) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async validateThirdParty(userDetails) {
    try {
      const user = await this.userRepo.findOneBy({ email: userDetails.email });
      console.log(userDetails);

      if (user) this.login(user);

      return this.register(userDetails);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async login(user) {
    const payload = { email: user.email, id: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: 'jwtsecret',
      }),
    };
  }

  async register(userDto: UserDto) {
    const user = await this.userRepo.findOneBy({ email: userDto.email });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const _user = this.userRepo.create(userDto);

    await this.userRepo.save(_user);

    return await this.login(_user);
  }
}
