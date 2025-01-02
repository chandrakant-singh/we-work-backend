import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    // If the route is marked as public, allow access without token
    if (isPublic) {
      return true;
    }

    // Check for the presence of a token in the Authorization header
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization token missing');
    }

    const token = authHeader.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token); // Validate token
      request.user = payload; // Attach user info to the request
      return true;
    } catch (error) {
      throw new UnauthorizedException(
        'Invalid or expired token',
        error.message,
      );
    }
  }
}
