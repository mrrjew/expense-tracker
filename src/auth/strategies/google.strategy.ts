import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { BadRequestException } from '@nestjs/common';

export default class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL:
        'https://ominous-robot-r5wqx4w7q55fwppv-3000.app.github.dev/api/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    try {
      const payload = {
        username: profile.givenName,
        email: profile.emails[0].value,
      };
      console.log(payload);
      const user = await this.authService?.validateThirdParty(payload);

      return user || null;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
