import { Meeting } from 'src/meeting/entities/meeting.entity';
import { QuizQuestion } from 'src/quizquestion/entities/quizquestion.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('quiz')
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => Meeting)
  meeting: Meeting;

  @OneToMany(() => QuizQuestion, (q) => q.quiz, { cascade: true })
  questions: QuizQuestion[];
}
