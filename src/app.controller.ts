import { Controller, Get } from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';
import { User, SkipAuth } from '@/core/decorators';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('me')
  public getProfile(@User() user: JWTStrategy.JWTUser) {
    return this.authService.getProfile(user);
  }
}
