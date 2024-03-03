import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-exercise-intro',
  templateUrl: './exercise-intro.component.html',
  styleUrls: ['./exercise-intro.component.css']
})
export class ExerciseIntroComponent {
  constructor(private router:Router) {}
  navigateToExercises() {
    const path = "exercises"
    this.router.navigate([path])
  }
}
