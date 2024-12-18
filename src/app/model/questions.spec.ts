import { Questions } from "./questions";

describe('Question', () => {
    it('should create an instance', () => {
      const question = new Questions(
        1,
        'Java',
        101,
        'What is the capital of France?',
        'A. Berlin',
        'B. Madrid',
        'C. Paris',
        'D. Rome',
        'C'
      );
      expect(question).toBeTruthy();
    });
  
    it('should have correct properties', () => {
      const question = new Questions(
        1,
        'Java',
        101,
        'What is the capital of France?',
        'A. Berlin',
        'B. Madrid',
        'C. Paris',
        'D. Rome',
        'C'
      );
  
      expect(question.id).toBe(1);
      expect(question.topic).toBe('Java');
      expect(question.questionId).toBe(101);
      expect(question.question).toBe('What is the capital of France?');
      expect(question.optionA).toBe('A. Berlin');
      expect(question.optionB).toBe('B. Madrid');
      expect(question.optionC).toBe('C. Paris');
      expect(question.optionD).toBe('D. Rome');
      expect(question.correctAnswer).toBe('C');
    });
  });