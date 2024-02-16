import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent {
  constructor(private router:Router) {
  }
  navigateToGames() {
    const path = "games"
    this.router.navigate([path])
  }

  navigateToVideos() {
    const path = "videos"
    this.router.navigate([path])
  }

  navigateToMusic() {
    const path = "music"
    this.router.navigate([path])
  }

  navigateToExercises() {
    const path = "exercises"
    this.router.navigate([path])
  }
}
