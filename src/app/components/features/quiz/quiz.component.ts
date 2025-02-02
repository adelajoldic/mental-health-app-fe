import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-games',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit{
  constructor(private router:Router) {
  }
  // public quiz = Router.QUIZ;
  navigateToFirstQuiz(): void {
    const path = "mood-quiz"
    this.router.navigate([path])
  }
  currentSlide = 0;
  slides: HTMLElement[] = [];

  ngOnInit() {
    this.slides = Array.from(document.querySelectorAll('.img-slider .slide'));
    setInterval(() => {
      this.nextSlide();
    }, 7000);
  }

  nextSlide() {
    this.slides[this.currentSlide].classList.remove('active');
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.slides[this.currentSlide].classList.add('active');
  }
}
