import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { CategoryService } from "../category/category.service";
import { CategoryModule } from "../category/category.module";
import { TagModule } from "../tag/tag.module";

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), CategoryModule, TagModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
