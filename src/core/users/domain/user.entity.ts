import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

import { Crypto } from '@/utils/crypto';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @IsEmail()
  @Column({ unique: true, nullable: true })
  email: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  username: string;

  @Exclude()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @BeforeInsert() async hashPassword() {
    this.password = Crypto.encodePassword(this.password);
  }
}
