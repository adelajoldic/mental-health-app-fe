import { Component } from '@angular/core';

interface Question {
  questionText: string;
  options: string[];
  correctOption: number;
  selectedOption?: number;
}

@Component({
  selector: 'app-first-quiz',
  templateUrl: './first-quiz.component.html',
  styleUrls: ['./first-quiz.component.css']
})
export class FirstQuizComponent {
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
  incorrectQuestions = 0; // New property to track incorrect answers
  earnedScore = 0;
  questionCorrectCounts: number[] = Array(this.totalQuestions).fill(0); // Track correct answers for each question
  questionIncorrectCounts: number[] = Array(this.totalQuestions).fill(0); // Track incorrect answers for each question

  submitQuiz() {
    const currentQuestion = this.questions[this.currentQuestionIndex];

    // Check if the selected option is correct and update the counts
    if (currentQuestion.selectedOption === currentQuestion.correctOption) {
      this.correctQuestions++;
      this.questionCorrectCounts[this.currentQuestionIndex]++;
    } else {
      this.incorrectQuestions++;
      this.questionIncorrectCounts[this.currentQuestionIndex]++;
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

      // Log additional information
      console.log('Total Correct Answers:', this.correctQuestions);
      console.log('Total Incorrect Answers:', this.incorrectQuestions);

      const maxCorrectIndex = this.questionCorrectCounts.indexOf(Math.max(...this.questionCorrectCounts));
      console.log('Question with Most Correct Answers:', this.questions[maxCorrectIndex].questionText);

      const minCorrectIndex = this.questionCorrectCounts.indexOf(Math.min(...this.questionCorrectCounts));
      console.log('Question with Least Correct Answers:', this.questions[minCorrectIndex].questionText);
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
