import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get("roles", context.getHandler());
    if (!roles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user) {
      return false;
    }

    const hasRoles = roles.some(role => role === user.role);
    return hasRoles;
  }
}
