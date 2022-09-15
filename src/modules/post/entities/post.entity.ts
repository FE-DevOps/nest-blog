import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_post')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    name: 'title',
    length: 50,
    nullable: false,
    comment: '文章标题',
  })
  title: string;

  @Column('varchar', {
    name: 'author',
    nullable: false,
    comment: '作者',
  })
  author: string;

  @Column('text', {
    name: 'content',
    nullable: false,
    comment: '内容',
  })
  content: string;

  @Column({
    default: '',
    comment: '封面图',
  })
  thumb_url: string;

  @Column('tinyint')
  type: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}
