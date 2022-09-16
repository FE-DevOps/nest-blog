import { HttpException, HttpStatus, Injectable, Param } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostEntity } from "./entities/post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryService } from "../category/category.service";
import { TagService } from "../tag/tag.service";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepos: Repository<PostEntity>,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService
  ) {
  };

  async create(post: CreatePostDto, user) {
    const { title, tag, category, status, isRecommend, thumbUrl } = post;
    const doc = await this.postRepos.findOne({
      where: {
        title
      }
    });
    if (doc) {
      throw new HttpException("文章已存在", HttpStatus.BAD_REQUEST);
    }
    const categoryDoc = await this.categoryService.findById(category);
    const tags = await this.tagService.findByIds(tag);

    const postParams: Partial<PostEntity> = {
      ...post,
      isRecommend: isRecommend,
      category: categoryDoc,
      tags,
      author: user
    };

    if (status === "publish") {
      Object.assign(postParams, {
        publishTime: new Date()
      });
    }

    const newPost: PostEntity = await this.postRepos.create({
      ...postParams
    });

    const res = await this.postRepos.save(newPost);
    return res;
  }

  findAll() {
    return this.postRepos.find({
      relations: ['category', 'tags', 'author']
    });
  }

}
