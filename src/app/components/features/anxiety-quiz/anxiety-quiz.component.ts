import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnxietyQuizService } from '../../../services/anxiety-quiz.service';

@Component({
  selector: 'app-anxiety-quiz',
  templateUrl: './anxiety-quiz.component.html',
  styleUrls: ['./anxiety-quiz.component.css']
})
export class AnxietyQuizComponent {
  constructor(private router: Router, public anxietyQuizService: AnxietyQuizService) {}

  ngOnInit(): void {
    // Initialize the quiz when the component is loaded or navigated to
    this.anxietyQuizService.restartQuiz();
  }

  getResultMessage(): string {
    return this.anxietyQuizService.getResultMessage();
  }

  getResultImage(): string {
    return this.anxietyQuizService.getResultImage();
  }
}
