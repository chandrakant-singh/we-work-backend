// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../modules/user/services/user.service';
import { UserDto } from 'src/modules/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.userService.findUserByUserName(userName);
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    console.log('USER FOUND: ', user);
    console.log('isPassword Valid: ', isPasswordValid);

    if (user && isPasswordValid) {
      return user;
    }
    return null;
  }

  async login(user: UserDto) {
    console.log(user);
    const payload = {
      userName: user.userName,
      sub: user._id,
      role: user.role,
      isActive: user.isActive,
      profileId: user.profileId,
    };
    console.log(payload);
    console.log(
      'VALIDATE: ',
      await this.validateToken(this.jwtService.sign(payload)),
    );
    return {
      user: {
        userName: user.userName,
        role: user.role,
        isActive: user.isActive,
        profileId: user.profileId,
        userId: user._id,
      },
      token: this.jwtService.sign(payload),
    };
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token); // Ensure secret is configured properly
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token', error);
    }
  }
}
