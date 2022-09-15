import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
  @ApiProperty({description: '邮箱'})
  @IsEmail()
  @IsNotEmpty({message: '请输入邮箱'})
  email: string;

  @ApiProperty({description: '密码'})
  @IsNotEmpty({message: '请输入密码'})
  password: string;
}
