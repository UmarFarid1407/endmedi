import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      throw new ForbiddenException('Authorization header is missing');
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      throw new ForbiddenException('Token is missing');
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: 'mw21ytre34#_4',
      });

      request.user = decoded;

      const requiredRoles = this.getRolesFromRequest(context);
      if (!requiredRoles.includes(decoded.role)) {
        throw new ForbiddenException('Insufficient role permissions');
      }

      return true;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Invalid or expired token');
    }
  }

  private getRolesFromRequest(context: ExecutionContext): string[] {
    const handler = context.getHandler();
    const roles = Reflect.getMetadata('roles', handler) || [];
    return roles;
  }
}
