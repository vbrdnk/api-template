import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
