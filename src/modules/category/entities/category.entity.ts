import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PostEntity } from "../../post/entities/post.entity";

@Entity("sys_category")
export class CategoryEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column('varchar')
  name: string;

  @OneToMany(() => PostEntity, post => post.category)
  posts: PostEntity[];

  @CreateDateColumn({
    type: "timestamp",
    comment: "创建时间",
    name: "create_time"
  })
  createTime: Date;

  @UpdateDateColumn({
    type: "timestamp",
    comment: "更新时间",
    name: "update_time"
  })
  updateTime: Date;
}
