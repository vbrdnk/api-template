import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';
import { LocalAuthGuard } from '@/auth/guards';
import { SkipAuth } from '@/core/decorators';
import { CreateUserDto, LoginUserDto } from '@/core/users/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @SkipAuth()
  @Post('signup')
  @HttpCode(204)
  public async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
}
