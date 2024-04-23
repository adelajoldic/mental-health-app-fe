import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface Question {
  questionText: string;
  options: string[];
  correctOption: number;
  selectedOption?: number;
}
@Injectable({
  providedIn: 'root'
})

export class AnxietyQuizService {
  public questions: Question[] = [
    {
      questionText: 'What is the primary difference between anxiety and depression?',
      options: ['Anxiety is characterized by excessive worry, while depression is characterized by low mood.',
        'Anxiety is only experienced during stressful situations, while depression is persistent.',
        'Anxiety primarily affects physical health, while depression primarily affects mental health.',
        'Anxiety is a temporary condition, while depression is chronic.'
      ],
      correctOption: 0
    },
    {
      questionText: 'Which planet is known as the Red Planet?',
      options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
      correctOption: 0
    },
    {
      questionText: 'What is the largest mammal?',
      options: ['Elephant', 'Blue Whale', 'Giraffe', 'Kangaroo'],
      correctOption: 1
    },
    // Add more questions here if needed
  ];

  public currentQuestionIndex = 0;
  public correctQuestions = 0;
  public earnedScore = 0;
  public feedbackMessage = '';
  public showFeedback = true;

  constructor(private router: Router) {}

  submitQuiz(): void {
    this.feedbackMessage = '';
    if (this.questions[this.currentQuestionIndex].selectedOption === this.questions[this.currentQuestionIndex].correctOption) {
      this.correctQuestions++;
      this.earnedScore = (this.correctQuestions / this.questions.length) * 100;
    }
    this.moveToNextQuestion();
    if (this.currentQuestionIndex === this.questions.length) {
      this.displayScore();
    }
  }

  getResultMessage(): string {
    if (this.correctQuestions === this.questions.length) {
      return 'Good job!';
    } else if (this.correctQuestions >= this.questions.length / 2) {
      return 'It\'s okay, you are halfway there.';
    } else {
      return 'Oops, you should learn more.';
    }
  }

  getResultImage(): string {
    if (this.correctQuestions === this.questions.length) {
      return '/assets/Win.png';
    } else if (this.correctQuestions >= this.questions.length / 2) {
      return '/assets/HalfWin.png';
    } else {
      return '/assets/TryAgain.png';
    }
  }

  displayScore(): void {
    this.showFeedback = false;
  }

  getTotalScore(): number {
    return this.correctQuestions;
  }

  getTotalQuestions(): number {
    return this.questions.length;
  }

  getCurrentQuestionNumber(): number {
    return this.currentQuestionIndex + 1;
  }

  selectOption(optionIndex: number): void {
    const selectedQuestion = this.questions[this.currentQuestionIndex];
    if (selectedQuestion.selectedOption !== undefined) {
      return;
    }
    selectedQuestion.selectedOption = optionIndex;
    if (selectedQuestion.selectedOption === selectedQuestion.correctOption) {
      this.feedbackMessage = 'Correct!';
    } else {
      this.feedbackMessage = 'That was not quite it.';
    }
  }

  moveToNextQuestion(): void {
    this.questions[this.currentQuestionIndex].selectedOption = -1;
    this.currentQuestionIndex++;
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.correctQuestions = 0;
    this.earnedScore = 0;
    this.feedbackMessage = '';
    this.showFeedback = true;
    // Reset selected options for each question
    this.questions.forEach(question => {
      question.selectedOption = undefined;
    });
  }

  navigateToGames(): void {
    this.router.navigate(['games']);
  }
}


