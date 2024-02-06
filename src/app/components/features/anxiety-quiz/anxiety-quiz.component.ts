import { Component } from '@angular/core';

interface Question {
  questionText: string;
  options: string[];
  correctOption: number;
  selectedOption?: number;
}
@Component({
  selector: 'app-anxiety-quiz',
  templateUrl: './anxiety-quiz.component.html',
  styleUrls: ['./anxiety-quiz.component.css']
})
export class AnxietyQuizComponent {
  quizTitle = 'Awesome Quiz';
  imageWon = "/assets/Win.png";
  imageHalf = "/assets/HalfWin.png";
  imageTryAgain = "/assets/TryAgain.png";
  questions: Question[] = [
    {
      questionText: 'Who was the first President of the United States?',
      options: ['George Washington', 'Thomas Jefferson', 'Thomas Edison', 'I don\'t know'],
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
    }
  ];

  currentQuestionIndex = 0;
  totalQuestions = this.questions.length;
  correctQuestions = 0; // New property to track correct answers
  earnedScore = 0;

  submitQuiz() {
    // Check if the selected option is correct and update the score
    if (this.questions[this.currentQuestionIndex].selectedOption === this.questions[this.currentQuestionIndex].correctOption) {
      this.correctQuestions++;
      this.earnedScore = (this.correctQuestions / this.totalQuestions) * 100; // Calculate percentage
    }

    // Move to the next question
    this.currentQuestionIndex++;

    // Check if the quiz has ended
    if (this.currentQuestionIndex === this.totalQuestions) {
      this.displayScore();
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
    // Display the earned score and image in the template
    const resultContainer = document.getElementById('quiz-result');
    if (resultContainer) {
      resultContainer.innerHTML = `
        <h3>Quiz Result</h3>
        <p>${this.getResultMessage()}</p>
        <p>Your earned score is: ${this.earnedScore.toFixed(2)}%</p>
        <img src="${this.getResultImage()}" alt="Result Image">
      `;
    }
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
    this.questions[questionIndex].selectedOption = optionIndex;
  }
}
