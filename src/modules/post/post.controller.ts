import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, HttpException
} from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("文章相关")
@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @ApiOperation({summary: '创建文章'})
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @ApiOperation({summary: '文章列表'})
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @ApiOperation({summary: '文章详情'})
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.postService.findOne(+id);
  }

  @ApiOperation({summary: '更新文章'})
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @ApiOperation({summary: '删除文章'})
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.postService.remove(+id);
  }
}
