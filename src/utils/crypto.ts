import * as bcrypt from 'bcrypt';

function encodePassword(password: string, rounds?: number): string {
  const salt = bcrypt.genSaltSync(rounds);
  return bcrypt.hashSync(password, salt);
}

function comparePasswords(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export const Crypto = {
  encodePassword,
  comparePasswords,
};
