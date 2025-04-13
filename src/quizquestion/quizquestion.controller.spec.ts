import { Test, TestingModule } from '@nestjs/testing';
import { QuizquestionController } from './quizquestion.controller';
import { QuizquestionService } from './quizquestion.service';

describe('QuizquestionController', () => {
  let controller: QuizquestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizquestionController],
      providers: [QuizquestionService],
    }).compile();

    controller = module.get<QuizquestionController>(QuizquestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
