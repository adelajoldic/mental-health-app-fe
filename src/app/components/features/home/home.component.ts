import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router:Router) {
  }
  navigateToHome(): void {
    const path = "/home"
    this.router.navigate([path])
  }
}
