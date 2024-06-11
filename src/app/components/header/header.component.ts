import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router:Router, private authService: AuthService) {
  }

  navigateToEducation() {
    const path = "education"
    this.router.navigate([path])
  }

  navigateToVideos() {
    const path = "videos"
    this.router.navigate([path])
  }

  navigateToProfile() {
    const path = "profile"
    this.router.navigate([path])
  }

  logout(): void {
      this.authService.logout();
    }
}
