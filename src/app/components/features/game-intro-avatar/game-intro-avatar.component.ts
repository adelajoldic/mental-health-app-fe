import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-game-intro-avatar',
  templateUrl: './game-intro-avatar.component.html',
  styleUrls: ['./game-intro-avatar.component.css']
})
export class GameIntroAvatarComponent {
  constructor(private router:Router) {}

  navigateToGameIntro() {
    const path = "games"
    this.router.navigate([path])
  }
}
