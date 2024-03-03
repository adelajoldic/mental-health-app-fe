import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-music-intro',
  templateUrl: './music-intro.component.html',
  styleUrls: ['./music-intro.component.css']
})
export class MusicIntroComponent {
  constructor(private router:Router) {}
  navigateToMusic() {
    const path = "music"
    this.router.navigate([path])
  }
}
