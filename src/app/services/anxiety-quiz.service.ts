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
      options: ['Anxiety is characterized by excessive worry, while depression is characterized by low mood',
        'Anxiety is only experienced during stressful situations, while depression is persistent',
        'Anxiety primarily affects physical health, while depression primarily affects mental health',
        'Anxiety is always triggered by external stressors, while depression is solely caused by internal factors'
      ],
      correctOption: 0
    },
    {
      questionText: 'What is a trigger to anxiety?',
      options: ['Physical exhaustion',
        'Unexpected encounters',
        'Perception or thought of danger',
        'Sudden loud noises'],
      correctOption: 2
    },
    {
      questionText: 'What situations can trigger the fight-flight-freeze response?',
      options: ['Only situations involving physical danger',
        'Any situation that causes discomfort',
        'Only situations involving emotional distress',
        'Both real and perceived threats'],
      correctOption: 3
    },
    {
      questionText: 'What is the primary function of anxiety?',
      options: ['To attract attention from others',
        'To serve as a protective mechanism',
        'To provide temporary pleasure',
        'To induce a state of relaxation'],
      correctOption: 1
    },
    {
      questionText: 'What happens to your body when you are anxious?',
      options: ['Developing a sudden craving for sugary foods as a coping mechanism',
        'Numbness and tingling sensations',
        'Feeling a sudden chill and wanting to wrap up in a warm blanket',
        'Feeling the need to stretch and loosen up stiff muscles'],
      correctOption: 1
    },
    {
      questionText: 'Which of these does anxiety affect?',
      options: [' Emotional responses, cognitive patterns, and lifestyle choices',
        'Physical symptoms, emotional reactions, and social interactions',
        'Physical symptoms, thoughts, and behaviors',
        'Mental attitudes, physiological reactions, and environmental influences'],
      correctOption: 2
    },
    {
      questionText: 'When does anxiety become a problem?',
      options: ['When external threats trigger a fight-or-flight response',
        'When the body becomes overly sensitive to environmental changes.',
        'When the body fails to respond to genuine danger',
        'When the body reacts to danger that doesn\'t exist'],
      correctOption: 3
    },
    {
      questionText: 'What type of thoughts does anxiety typically involve?',
      options: ['Fear of something bad happening in the future',
        'Fantasies about positive outcomes in the future',
        'Memories of past events causing distress',
        'Reflections on current circumstances and experiences'],
      correctOption: 0
    },
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


