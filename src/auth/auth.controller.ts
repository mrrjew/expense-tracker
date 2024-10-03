import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { UserDto } from './dto/user.dto';
import { OAuthGuard } from './guards/oauth.guard';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google/login')
  @UseGuards(OAuthGuard)
  async thirdPartyLogin() {}

  @Get('google/redirect')
  @UseGuards(OAuthGuard)
  async thirdPartyLoginRedirect() {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registerBody: UserDto) {
    return await this.authService.register(registerBody);
  }
}
