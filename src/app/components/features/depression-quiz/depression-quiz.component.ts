import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DepressionQuizService } from '../../../services/depression-quiz.service';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-depression-quiz',
  templateUrl: './depression-quiz.component.html',
  styleUrls: ['./depression-quiz.component.css']
})
export class DepressionQuizComponent {
  constructor(private router: Router, public depressionQuizService: DepressionQuizService, private authService: AuthService) {}

  ngOnInit(): void {
    // Check if the user is logged in
    if (!this.authService.isLoggedIn()) {
      // Redirect to the login page if not logged in
      this.router.navigate(['/login']);
    } else {
      // Initialize the quiz if logged in
      this.depressionQuizService.restartQuiz();
    }
  }

  submitAnswer(): void {
    // Fetch the user's profile data to get the user email
    const userProfileData = this.authService.getUserProfileData();
    if (userProfileData) {
      const userEmail = userProfileData.email;
      // Call the submitQuiz method of the AnxietyQuizService with the user email
      this.depressionQuizService.submitQuiz(userEmail);
    }
  }

  goBack(): void {
    // Navigate back when the user clicks the go back button
    this.router.navigate(['/games']);
  }

  getResultMessage(): string {
    return this.depressionQuizService.getResultMessage();
  }

  getResultImage(): string {
    return this.depressionQuizService.getResultImage();
  }
}

