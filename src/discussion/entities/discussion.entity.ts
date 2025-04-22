import { DiscussionReply } from 'src/discussionreply/entities/discussionreply.entity';
import { Meeting } from 'src/meeting/entities/meeting.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('discussion')
export class Discussion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(() => Meeting)
  meeting: Meeting;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_guru' }) // nama kolom di database
  create_by: User; // nama properti di entity

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => DiscussionReply, (reply) => reply.discussion, {
    cascade: true,
  })
  discussionReplies: DiscussionReply[];
}
