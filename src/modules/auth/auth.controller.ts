import { Body, ClassSerializerInterceptor, Controller, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";

@ApiTags("登录鉴权相关")
@Controller("auth")
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {
  }

  @UseGuards(AuthGuard("local"))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post("login")
  async login(@Body() user: LoginDto, @Req() req) {
    return this.authService.login(req.user);
  }
}
