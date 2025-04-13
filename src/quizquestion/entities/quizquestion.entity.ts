import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

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
}
