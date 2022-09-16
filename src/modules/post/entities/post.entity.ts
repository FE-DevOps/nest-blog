import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import { CategoryEntity } from "../../category/entities/category.entity";
import { TagEntity } from "../../tag/entities/tag.entity";
import { UserEntity } from "../../user/entities/user.entity";

@Entity("sys_post")
export class PostEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {
    name: "title",
    length: 50,
    nullable: false,
    comment: "文章标题"
  })
  title: string;

  @Column("text", {
    name: "content",
    nullable: true,
    comment: "内容"
  })
  content: string;

  @Column({
    name: 'thumb_url',
    nullable: true,
    comment: "封面图"
  })
  thumbUrl: string;

  @Column("varchar", {
    nullable: true,
    comment: "摘要"
  })
  summary: string;

  @Column("int", {
    name: "view_count",
    default: 0,
    comment: "浏览量"
  })
  viewCount: number;

  @Column("int", {
    name: "like_count",
    default: 0,
    comment: "点赞量"
  })
  likeCount: number;

  @Column("tinyint", {
    name: "is_recommend",
    default: 0,
    comment: "是否推荐"
  })
  isRecommend: number;

  @Column("simple-enum", {
    enum: ["draft", "publish"],
    default: "draft",
    comment: "文章是否展示，状态"
  })
  status: string;

  @ManyToOne(() => UserEntity, user => user.posts)
  author: UserEntity;

  @ManyToOne(() => CategoryEntity, category => category.posts)
  @JoinColumn({ name: "category_id" })
  category: CategoryEntity;

  @ManyToMany(() => TagEntity, tag => tag.posts)
  @JoinTable({
    name: "sys_post_tag",
    joinColumns: [{ name: "post_id" }],
    inverseJoinColumns: [{ name: "tag_id" }]
  })
  tags: TagEntity[];

  @Column({ type: 'timestamp', name: 'publish_time', default: null })
  publishTime: Date;

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
