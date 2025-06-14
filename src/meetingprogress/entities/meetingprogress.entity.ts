import { Meeting } from 'src/meeting/entities/meeting.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity('meeting_progress')
export class MeetingProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Meeting)
  meeting: Meeting;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user' }) // nama kolom di database
  create_by: User;

  @Column({ default: false })
  quizCompleted: boolean;

  @Column({ default: false })
  moduleRead: boolean;

  @Column({ default: false })
  videoWatched: boolean;

  @Column({ default: false })
  participatedInDiscussion: boolean;

  @Column({ default: false })
  assignmentUploaded: boolean;

  @UpdateDateColumn()
  updatedAt: Date;
}
