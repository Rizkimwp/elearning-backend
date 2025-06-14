import { MeetingProgress } from 'src/meetingprogress/entities/meetingprogress.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('meeting')
export class Meeting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'int' })
  order: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_guru' }) // nama kolom di database
  create_by: User; // nama properti di entity

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Quiz, (quiz) => quiz.meeting)
  quizzes: Quiz[];

  @OneToMany(() => MeetingProgress, (progress) => progress.meeting)
  progresses: MeetingProgress[]; // <- Tambahkan ini
}
