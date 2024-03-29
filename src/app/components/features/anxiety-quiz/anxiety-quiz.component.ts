import { Component } from '@angular/core';
import {Router} from "@angular/router";

interface Question {
  questionText: string;
  options: string[];
  correctOption: number;
  selectedOption?: number;
  answeredCorrectly?: boolean; // New property to track if the question was answered correctly
}

@Component({
  selector: 'app-anxiety-quiz',
  templateUrl: './anxiety-quiz.component.html',
  styleUrls: ['./anxiety-quiz.component.css']
})
export class AnxietyQuizComponent {

  constructor(private router:Router) {}

  imageWon = "/assets/Win.png";
  imageHalf = "/assets/HalfWin.png";
  imageTryAgain = "/assets/TryAgain.png";

  questions: Question[] = [
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
    {
      questionText: 'What is the largest mammal?',
      options: ['Elephant', 'Blue Whale', 'Giraffe', 'Kangaroo'],
      correctOption: 1
    },
    // Add more questions here if needed
  ];

  currentQuestionIndex = 0;
  totalQuestions = this.questions.length;
  correctQuestions = 0; // New property to track correct answers
  earnedScore = 0;

  // New property for dialog message and visibility flag
  feedbackMessage: string = ''; // Variable to store feedback message
  showFeedback: boolean = true; // Flag to control feedback message visibility

  submitQuiz() {
    // Clear previous feedback message
    this.feedbackMessage = '';

    // Check if the selected option is correct and update the score
    if (this.questions[this.currentQuestionIndex].selectedOption === this.questions[this.currentQuestionIndex].correctOption) {
      this.questions[this.currentQuestionIndex].answeredCorrectly = true; // Mark the question as answered correctly
      this.correctQuestions++;
      this.earnedScore = (this.correctQuestions / this.totalQuestions) * 100; // Calculate percentage
    }

    // Move to the next question
    this.moveToNextQuestion();

    // Check if all questions are answered
    if (this.currentQuestionIndex === this.totalQuestions) {
      this.displayScore(); // If all questions are answered, display the final result
    }
  }

  getResultMessage(): string {
    if (this.correctQuestions === this.totalQuestions) {
      return 'Good job!';
    } else if (this.correctQuestions >= this.totalQuestions / 2) {
      return 'It\'s okay, you are halfway there.';
    } else {
      return 'Oops, you should learn more.';
    }
  }

  getResultImage(): string {
    if (this.correctQuestions === this.totalQuestions) {
      return this.imageWon;
    } else if (this.correctQuestions >= this.totalQuestions / 2) {
      return this.imageHalf;
    } else {
      return this.imageTryAgain;
    }
  }

  displayScore() {
    // Hide the feedback message
    this.showFeedback = false;
  }

  getTotalScore(): number {
    return this.correctQuestions;
  }

  getTotalQuestions(): number {
    return this.totalQuestions;
  }

  getCurrentQuestionNumber(): number {
    return this.currentQuestionIndex + 1;
  }

  selectOption(questionIndex: number, optionIndex: number): void {
    const selectedQuestion = this.questions[questionIndex];

    // Check if the question has already been answered
    if (selectedQuestion.selectedOption !== undefined) {
      // If so, don't allow selecting another option
      return;
    }

    // Assign selected option to the question
    selectedQuestion.selectedOption = optionIndex;

    // Check if the selected option is correct
    if (selectedQuestion.selectedOption === selectedQuestion.correctOption) {
      // Update feedback message for correct answer
      this.feedbackMessage = 'Correct!';
    } else {
      // Update feedback message for wrong answer
      this.feedbackMessage = 'That was not quite it.';
    }
  }

  moveToNextQuestion(): void {
    // Disable options for the current question
    this.questions[this.currentQuestionIndex].selectedOption = -1;

    // Move to the next question
    this.currentQuestionIndex++;
  }

  navigateToGames() {
    const path = "games"
    this.router.navigate([path])
  }
}
