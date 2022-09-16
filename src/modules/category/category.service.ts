import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>
  ) {
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepo.save(createCategoryDto);
  }

  async findById(category) {
    return this.categoryRepo.findOne({
      where: {
        id: category.id
      }
    });
  }

  async findAll() {
    return await this.categoryRepo.find();
  }
}
