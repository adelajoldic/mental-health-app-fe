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
        'Anxiety and depression are the same mental health condition'
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
      questionText: 'Are the fear and anxiety two different things?',
      options: ['Yes, fear and anxiety are exactly the same',
        'Yes, fear and anxiety both trigger similar reactions in the body',
        'Yes, both fear and anxiety involve feeling scared',
        'Fear is the result of a threat or impending danger, while anxiety is a reaction to emotions instead of danger in the environment'],
      correctOption: 3
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
        'All of the above'],
      correctOption: 3
    },
    {
      questionText: 'When does anxiety become a problem?',
      options: ['When external threats trigger a fight-or-flight response',
        'When anxiety is absent, and there are no triggers present',
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
    // Check if an option has been selected
    if (this.questions[this.currentQuestionIndex].selectedOption === undefined) {
      this.feedbackMessage = 'Please select an option before submitting.';
      return; // Exit the method without further processing
    }
    // Check if the selected option is correct
    if (this.questions[this.currentQuestionIndex].selectedOption === this.questions[this.currentQuestionIndex].correctOption) {
      this.correctQuestions++;
      this.feedbackMessage = 'Correct!';
    } else {
      this.feedbackMessage = 'That was not quite it.';
    }

    this.earnedScore = (this.correctQuestions / this.questions.length) * 100;
    this.showFeedback = true;

    // Move to the next question after displaying feedback
    setTimeout(() => {
      this.moveToNextQuestion();
      this.showFeedback = false;
    }, 2000); // Adjust the delay as needed

    // Check if all questions have been answered
    if (this.currentQuestionIndex === this.questions.length) {
      this.displayScore();
    }
  }

  getResultMessage(): string {
    if (this.correctQuestions === this.questions.length) {
      return 'Good job!';
    } else if (this.correctQuestions >= this.questions.length / 2) {
      return 'It\'s okay, you are almost there.';
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
