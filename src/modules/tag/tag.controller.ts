import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { TagService } from "./tag.service";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("文章标签管理")
@Controller("tag")
export class TagController {
  constructor(private readonly tagService: TagService) {
  }

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  list() {
    return this.tagService.findAll();
  }
}
