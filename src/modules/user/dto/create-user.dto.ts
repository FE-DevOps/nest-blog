import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ description: "邮箱" })
  @IsEmail()
  @IsNotEmpty({ message: "邮箱不能为空" })
  readonly email: string;

  @ApiProperty({ description: "密码" })
  @IsNotEmpty({ message: "密码不能为空" })
  readonly password: string;
}
