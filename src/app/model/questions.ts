export class Questions {
    id: number;
    topic: string;
    questionId: number;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: string;
  
    constructor(
      id: number,
      topic: string,
      questionId: number,
      question: string,
      optionA: string,
      optionB: string,
      optionC: string,
      optionD: string,
      correctAnswer: string
    ) {
      this.id = id;
      this.topic = topic;
      this.questionId = questionId;
      this.question = question;
      this.optionA = optionA;
      this.optionB = optionB;
      this.optionC = optionC;
      this.optionD = optionD;
      this.correctAnswer = correctAnswer;
    }
  }