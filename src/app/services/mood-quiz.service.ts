import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface Question {
  questionText: string;
  options: string[];
  correctOption?: number;
  selectedOption?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MoodQuizService {
  public questions: Question[] = [
    {
      questionText: 'How would you describe your overall mood right now?',
      options: ['Happy and content', 'Sad or upset', 'Anxious or stressed', 'Calm and relaxed']
    },
    {
      questionText: 'On a scale of 1 to 10, how pleasant are you feeling at the moment?',
      options: ['1-3: Very unpleasant', '4-6: Neutral', '7-8: Pleasant', '9-10: Extremely pleasant']
    },
    {
      questionText: 'Are you feeling more positive or negative emotions right now?',
      options: ['Mostly positive', 'Mostly negative', 'A mix of both', 'Neither positive nor negative']
    },
    {
      questionText: 'Do you feel a sense of energy and excitement, or are you feeling more calm and relaxed?',
      options: ['High energy and excitement', 'Calm and relaxed', 'A mix of both', 'Neither high energy nor calm']
    },
    {
      questionText: 'What emotions are you experiencing the most strongly right now?',
      options: ['Happiness', 'Anger', 'Fear', 'Peacefulness']
    },
    {
      questionText: 'Are there any specific events or situations that are influencing your current emotional state?',
      options: ['Yes, positive events', 'Yes, negative events', 'No, it\'s unrelated to events', 'Not sure']
    },
    {
      questionText: 'How do you typically cope with challenging emotions?',
      options: ['Talking to a friend or loved one', 'Engaging in physical activity', 'Practicing relaxation techniques', 'Distracting myself with hobbies or activities']
    },
    {
      questionText: 'Are there any activities or strategies that help you feel better when you\'re experiencing negative emotions?',
      options: ['Listening to music', 'Journaling or writing', 'Meditating or practicing mindfulness', 'Seeking professional help']
    }
  ];

  public currentQuestionIndex = 0;
  public analysisResult: string | null = null;

  constructor(private router: Router) {}

  provideFeedback(): string {
    const answers = this.questions.map(question => {
      return question.options[question.selectedOption || 0];
    });

    let feedback = '';

    // Analyzing the dominant mood based on the selected options
    const moodCounts: { [key: string]: number } = {};
    for (const answer of answers) {
      moodCounts[answer] = (moodCounts[answer] || 0) + 1;
    }

    let dominantMood = '';
    let maxCount = 0;
    for (const mood in moodCounts) {
      if (moodCounts[mood] > maxCount) {
        maxCount = moodCounts[mood];
        dominantMood = mood;
      }
    }

    // Providing feedback based on the dominant mood
    switch (dominantMood) {
      case 'Happy and content':
        feedback = 'Based on your responses, it seems that you\'re currently experiencing a positive and content mood. Keep nurturing this good mood!';
        break;
      case 'Sad or upset':
        feedback = 'Your responses indicate that you\'re currently feeling sad or upset. It\'s okay to feel this way sometimes. Consider engaging in activities that usually bring you happiness or reaching out to a friend for support.';
        break;
      case 'Anxious or stressed':
        feedback = 'It appears that you\'re feeling anxious or stressed. Remember to take some deep breaths and try relaxation techniques to calm your mind.';
        break;
      case 'Calm and relaxed':
        feedback = 'You\'re currently in a state of calm and relaxation. Take this opportunity to enjoy the tranquility and recharge.';
        break;
      default:
        feedback = 'Based on your responses, it seems like you\'re experiencing a mix of emotions or feeling neutral. Remember to prioritize self-care and seek support if needed.';
        break;
    }

    return feedback;
  }

  moveToNextQuestion(): void {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions.length) {
      this.analysisResult = this.provideFeedback();
    }
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.analysisResult = null;
    // Reset selected options for each question
    this.questions.forEach(question => {
      question.selectedOption = undefined;
    });
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
  goBack(): void {
    this.currentQuestionIndex--;
  }
}
