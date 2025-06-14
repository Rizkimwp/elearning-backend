import { Quiz } from 'src/quiz/entities/quiz.entity';
import { QuizAnswer } from 'src/quizanswers/entities/quizanswer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('quiz_question')
export class QuizQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  questionText: string;

  @Column('simple-array')
  options: string[];

  @Column()
  correctAnswer: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  @OneToMany(() => QuizAnswer, (answer) => answer.quizQuestion)
  quizAnswers: QuizAnswer[];
}
