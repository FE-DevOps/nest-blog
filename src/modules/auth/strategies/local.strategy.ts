import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BadRequestException } from "@nestjs/common";

import { UserEntity } from "../../user/entities/user.entity";
import { compareSync } from "bcryptjs";
import { use } from "passport";

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
  ) {
    // filed 默认 username 与 password， 我们使用 email + password 登录
    super({
      usernameField: "email"
    });
  }

  async validate(email: string, password: string) {
    const user = await this.userRepo
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.email=:email", { email })
      .getOne();

    if(!user) {
      throw new BadRequestException('请输入正确的邮箱账号')
    }

    if(!compareSync(password, user.password)) {
      throw new BadRequestException('密码错误')
    }

    return user;
  }
}
