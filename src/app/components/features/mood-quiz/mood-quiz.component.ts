import { Component } from '@angular/core';
import { MoodQuizService } from '../../../services/mood-quiz.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mood-quiz',
  templateUrl: './mood-quiz.component.html',
  styleUrls: ['./mood-quiz.component.css']
})
export class MoodQuizComponent {
  constructor(public moodQuizService: MoodQuizService, private router: Router) {}

  showQuizOptions(): boolean {
    return (
      !this.moodQuizService.analysisResult &&
      this.moodQuizService.currentQuestionIndex < this.moodQuizService.questions.length
    );
  }

  navigateToGames(): void {
    this.moodQuizService.restartQuiz();
    this.router.navigate(['games']);
  }

  protected readonly MoodQuizService = MoodQuizService;
}
