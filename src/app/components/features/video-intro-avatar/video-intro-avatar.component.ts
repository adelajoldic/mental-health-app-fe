import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-video-intro-avatar',
  templateUrl: './video-intro-avatar.component.html',
  styleUrls: ['./video-intro-avatar.component.css']
})
export class VideoIntroAvatarComponent {
  constructor(private router:Router) {}
  navigateToVideos() {
    const path = "videos"
    this.router.navigate([path])
  }

}
