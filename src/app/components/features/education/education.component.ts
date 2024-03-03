import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent {
  constructor(private router:Router) {}
  navigateToGameIntro() {
    const path = "games-ena"
    this.router.navigate([path])
  }

  navigateToVideoIntro() {
    const path = "education-ena"
    this.router.navigate([path])
  }

  navigateToMusicIntro() {
    const path = "music-ena"
    this.router.navigate([path])
  }

  navigateToExerciseIntro() {
    const path = "exercises-ena"
    this.router.navigate([path])
  }
}
