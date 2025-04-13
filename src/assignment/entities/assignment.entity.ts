import { Meeting } from 'src/meeting/entities/meeting.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('assigment')
export class Assignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Meeting)
  meeting: Meeting;

  @ManyToOne(() => User)
  student: User;

  @Column()
  filePath: string;

  @Column({ nullable: true })
  note: string;

  @CreateDateColumn()
  submittedAt: Date;
}
