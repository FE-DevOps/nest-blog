import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePostDto {
  @ApiProperty({ description: "文章标题" })
  @IsNotEmpty({ message: "文章标题不能为空" })
  readonly title: string;

  @ApiPropertyOptional({ description: "内容" })
  readonly content: string;

  @ApiPropertyOptional({ description: "文章封面" })
  readonly thumbUrl: string;

  @ApiPropertyOptional({ description: "文章状态" })
  readonly status: string;

  @ApiProperty({ description: "文章分类" })
  readonly category: number;

  @ApiPropertyOptional({ description: "是否推荐" })
  readonly isRecommend: number;

  @ApiPropertyOptional({ description: "标签" })
  readonly tag: string[];
}

