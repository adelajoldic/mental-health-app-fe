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
export class DepressionQuizService {
  public questions: Question[] = [
    {
      questionText: 'What is depression?',
      options: ['A temporary mood fluctuation',
        'A severe form of anxiety disorder',
        'A common mental disorder characterized by a depressed mood or loss of interest in activities for long periods of time',
        'A physical illness caused by a virus'],
      correctOption: 2
    },
    {
      questionText: 'Which of the following are symptoms of depression?',
      options: [' Increased appetite and energy',
        'Decreased self-esteem, poor concentration, feeling very tired or low in energy',
        'Excessive talkativeness and racing thoughts',
        'Feeling excessively happy or euphoric'],
      correctOption: 1
    },
    {
      questionText: 'What is the best way to treat depression?',
      options: ['Only through self-care practices like exercise and socializing',
        'Exclusively with antidepressant medications',
        'Through a combination of psychological treatments and medications',
        'Solely by ignoring the symptoms and hoping they go away'],
      correctOption: 2
    },
    {
      questionText: 'What percentage of pregnant women and women who have just given birth experience depression?',
      options: ['More than 10%',
        '10%',
        '3%',
        '5%'],
      correctOption: 0
    },
    {
      questionText: 'What are some barriers to effective care for depression?',
      options: ['Accessible mental health services, trained health-care providers, and societal acceptance of mental health issues',
        'Strict government regulations, excessive treatment options, and lack of community support',
        'High investment in mental health care, overabundance of trained health-care providers, and normalization of mental health disorders',
        'Lack of investment in mental health care, lack of trained health-care providers, and social stigma associated with mental disorders'],
      correctOption: 3
    },
    {
      questionText: 'How does a depressive episode differ from regular mood fluctuations?',
      options: ['Depressive episodes occur sporadically throughout the day, while mood fluctuations are constant',
        'Regular mood fluctuations last longer and are more severe than depressive episodes',
        'Depressive episodes last most of the day, nearly every day, for at least two weeks, while regular mood fluctuations are short-lived',
        'Regular mood fluctuations occur with specific triggers, whereas depressive episodes do not'],
      correctOption: 2
    },
    {
      questionText: 'What contributes to the development of depression?',
      options: ['Genetics alone determine the onset of depression',
        'Only social factors such as unemployment and bereavement contribute to depression',
        'Depression is solely caused by biological factors and is unrelated to life experiences',
        'Depression results from a complex interaction of social, psychological, and biological factors, including adverse life events'],
      correctOption: 3
    },
    {
      questionText: 'How is depression related to physical health?',
      options: ['Depression has no impact on physical health',
        'Only mental health conditions affect physical health',
        'Depression is closely related to and affected by physical health, with factors like physical inactivity or harmful alcohol use posing risks',
        'Physical health is completely independent of depression and its symptoms'],
      correctOption: 2
    },
    {
      questionText: 'Which of the following are effective psychological treatments for depression?',
      options: [' Behavioural activation, cognitive behavioural therapy, interpersonal psychotherapy, problem-solving therapy',
        'Herbal remedies and crystal healing',
        'Engaging in solitary activities without seeking professional help',
        'Hypnotherapy and acupuncture'],
      correctOption: 0
    },
    {
      questionText: 'How should antidepressants be used in the treatment of depression in children and adolescents?',
      options: ['Antidepressants are the preferred treatment for children and adolescents with depression',
        'Antidepressants should be used without caution in children and adolescents',
        'Antidepressants should be the first line of treatment for adolescents but not for children',
        'Antidepressants should not be used for treating depression in children and are not the first line of treatment in adolescents, among whom they should be used with extra caution'],
      correctOption: 3
    },
    {
      questionText: 'Which of the following are recommended self-care practices for managing symptoms of depression?',
      options: ['Spending excessive time alone and avoiding social interaction',
        'Trying to keep doing activities you used to enjoy, staying connected to friends and family, and exercising regularly',
        'Increasing alcohol consumption and using illicit drugs',
        'Ignoring feelings and not seeking help from anyone'],
      correctOption: 1
    },
    {
      questionText: 'Is it true that depression affects men and women equally?',
      options: ['Yes',
        'No',
        'Maybe',
        'I don\'t know'],
      correctOption: 1
    },
  ];

  public currentQuestionIndex = 0;
  public correctQuestions = 0;
  public earnedScore = 0;
  public feedbackMessage = '';
  public showFeedback = true;

  constructor(private router: Router) {}

  // submitQuiz(): void {
  //   this.feedbackMessage = '';
  //   if (this.questions[this.currentQuestionIndex].selectedOption === this.questions[this.currentQuestionIndex].correctOption) {
  //     this.correctQuestions++;
  //     this.earnedScore = (this.correctQuestions / this.questions.length) * 100;
  //   }
  //   this.moveToNextQuestion();
  //   if (this.currentQuestionIndex === this.questions.length) {
  //     this.displayScore();
  //   }
  // }
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
      this.earnedScore = (this.correctQuestions / this.questions.length) * 100;
    }
    this.moveToNextQuestion();

    // Check if all questions have been answered
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
