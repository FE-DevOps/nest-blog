import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, HttpException, UseGuards, Req
} from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../auth/decorators/role.decorator";
import { RoleGuard } from "../auth/guards/role.guard";

@ApiTags("文章相关")
@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @ApiOperation({summary: '创建文章'})
  @ApiBearerAuth()
  @Roles('admin', 'root')  // 新增文章的权限
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req) {
    return this.postService.create(createPostDto, req.user);
  }

  @ApiOperation({summary: '文章列表'})
  @Get()
  findAll() {
    return this.postService.findAll();
  }

}
