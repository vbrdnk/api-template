import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@/core/users/domain/user.entity';
import { UsersService } from '@/core/users/users.service';
import { Crypto } from '@/utils/crypto';
import type { LoginUserDto, CreateUserDto } from '@/core/users/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findOne(username);
    if (user && Crypto.comparePasswords(pass, user.password)) {
      return user;
    }
    return null;
  }

  public async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findOne(loginUserDto.username);
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async signup(user: CreateUserDto) {
    return this.usersService.create(user);
  }

  public async getProfile(user: JWTStrategy.JWTUser) {
    return this.usersService.findOne(user.username);
  }
}
