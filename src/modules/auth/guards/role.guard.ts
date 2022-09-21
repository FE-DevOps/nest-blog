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
    // 反射器从上下文中获取角色列表
    const roles = this.reflector.get("roles", context.getHandler());

    // 接口没配置权限，直接过
    if (!roles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user) {
      return false;
    }

    console.log(roles, user)

    const hasRoles = roles.some(role => role === user.role);
    return hasRoles;
  }
}
