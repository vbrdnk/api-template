import { Crypto } from '../crypto';

describe('Crypto', () => {
  const password = 'testpass';

  describe('compare passwords', () => {
    it('should correctly compare raw password and hash', () => {
      const encoded = Crypto.encodePassword(password);
      expect(Crypto.comparePasswords(password, encoded)).toEqual(true);
    });
  });
});
