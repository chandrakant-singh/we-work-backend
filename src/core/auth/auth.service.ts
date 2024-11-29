// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../modules/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.userService.findUserByUserName(userName);
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    console.log('Password valid:', user);
    console.log('Password valid:', isPasswordValid);

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      console.log(passwordHash);
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { userName: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
