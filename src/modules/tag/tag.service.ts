import { Injectable } from "@nestjs/common";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TagEntity } from "./entities/tag.entity";
import { Repository } from "typeorm";

@Injectable()
export class TagService {

  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepo: Repository<TagEntity>
  ) {
  }

  async create(createTagDto: CreateTagDto) {
    return await this.tagRepo.save(createTagDto);
  }

  async findByIds(ids) {
    return await this.tagRepo.find({
      where: {
        id: ids
      }
    })
  }

  async findAll() {
    return await this.tagRepo.find();
  }
}
