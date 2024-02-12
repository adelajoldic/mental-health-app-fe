import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router:Router) {
  }

  navigateToLogin(): void {
    const path = "login"
    this.router.navigate([path])
  }

  navigateToRegister(): void {
    const path = "register"
    this.router.navigate([path])
  }
  navigateToHome() {
    const path = "home"
    this.router.navigate([path])

  }
  navigateToEducation() {
    const path = ""
    this.router.navigate([path])
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

  navigateToProfile() {
    const path = "profile"
    this.router.navigate([path])
  }
}
