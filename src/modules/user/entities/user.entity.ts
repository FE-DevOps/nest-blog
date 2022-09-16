import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcryptjs";
import { Exclude } from "class-transformer";
import { PostEntity } from "../../post/entities/post.entity";

@Entity("sys_user")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {
    length: 100,
    nullable: true
  })
  username: string;

  @Column("varchar", {
    length: 100,
    nullable: true
  })
  nickname: string;

  @Exclude() // 创建完用户不返回密码
  @Column({
    select: false
  })
  password: string;

  @Column("varchar", {
    nullable: true
  })
  avatar: string;

  @Column("varchar")
  email: string;

  @Column("simple-enum", {
    enum: ["root", "author", "visitor"],
    default: 'visitor'
  })
  role: string;

  @OneToMany(() => PostEntity, post => post.author)
  posts: PostEntity[];

  @Column({
    name: "create_time",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
  createTime: Date;

  @Column({
    name: "update_time",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
  updateTime: Date;

  @BeforeInsert()
  async encryptPwd() {
    this.password = await bcrypt.hashSync(this.password);
  }

}
