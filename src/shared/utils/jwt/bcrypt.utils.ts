import * as bcrypt from 'bcrypt';

export class BcryptUtils {
  static async hashPassword(
    password: string,
  ): Promise<{ salt: string; passwordHash: string }> {
    const salt = await bcrypt.genSalt();
    return { salt, passwordHash: await bcrypt.hash(password, salt) };
  }
}
