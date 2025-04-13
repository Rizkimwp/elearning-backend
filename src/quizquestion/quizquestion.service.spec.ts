import { Test, TestingModule } from '@nestjs/testing';
import { QuizquestionService } from './quizquestion.service';

describe('QuizquestionService', () => {
  let service: QuizquestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizquestionService],
    }).compile();

    service = module.get<QuizquestionService>(QuizquestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
