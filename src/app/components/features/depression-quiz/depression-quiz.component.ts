import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DepressionQuizService } from '../../../services/depression-quiz.service';

@Component({
  selector: 'app-depression-quiz',
  templateUrl: './depression-quiz.component.html',
  styleUrls: ['./depression-quiz.component.css']
})
export class DepressionQuizComponent {
  constructor(private router: Router, public depressionQuizService: DepressionQuizService) {}

  ngOnInit(): void {
    // Initialize the quiz when the component is loaded or navigated to
    this.depressionQuizService.restartQuiz();
  }

  getResultMessage(): string {
    return this.depressionQuizService.getResultMessage();
  }

  getResultImage(): string {
    return this.depressionQuizService.getResultImage();
  }
}
