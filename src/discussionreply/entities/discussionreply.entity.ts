import { Discussion } from 'src/discussion/entities/discussion.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity('discussion_reply')
export class DiscussionReply {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  message: string;

  @ManyToOne(() => Discussion, (discussion) => discussion.discussionReplies)
  discussion: Discussion;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user' }) // nama kolom di database
  create_by: User; // nama properti di entity

  @CreateDateColumn()
  createdAt: Date;
}
