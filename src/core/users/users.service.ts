import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/core/users/domain/user.entity';
import type { CreateUserDto } from '@/core/users/dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findOne(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  public async create(userDto: CreateUserDto): Promise<User> {
    const { password, username } = userDto;
    const userInDb = await this.usersRepository.findOneBy({ username });

    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user = this.usersRepository.create({ username, password });
    await this.usersRepository.save(user);
    return user;
  }
}
