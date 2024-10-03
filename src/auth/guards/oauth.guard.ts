import { AuthGuard } from '@nestjs/passport';

export class OAuthGuard extends AuthGuard('google') {}
