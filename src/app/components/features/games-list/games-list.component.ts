import { Component } from '@angular/core';
import {Router} from "@angular/router";

interface Game {
  title: string;
  description: string;
  image: string;
  route: string;
}
@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent {
  public intro:string = "Experience the positive influence of short quizzes and games on your mental well-being." +
    " Delve into a variety of interactive challenges that not only entertain but also contribute to improved " +
    "focus and cognitive wellness." +
    "Your mental health is part of the game. Let's level up together, breaking barriers and embracing the positive " +
    "impact of gaming on our well-being. 🚀💙🕹️ #GameMindWellness #LevelUpMentalHealth";
  constructor(private router:Router) {
  }

  games: Game[] = [
    {
      title: 'Mental Health Quiz',
      description: 'Curious about your mental health literacy? Dive into our quiz and evaluate your understanding of mental health issues, from common conditions to strategies for maintaining a positive mindset.',
      image: 'assets/knowledge-game.jpeg',
      route: 'quiz'
    },
    {
      title: 'Anxiety Quiz',
      description: 'Embark on a journey of self-discovery with our Anxiety Quiz Symptoms Game. Uncover hidden aspects of your emotional well-being and gain insights into managing anxiety.',
      image: 'assets/anxiety-quiz.jpeg',
      route: 'anxiety-quiz'
    },
    {
      title: 'Depression Quiz',
      description: 'Navigate the path to emotional well-being with our Depression Quiz. Uncover symptoms, embrace self-awareness, and embark on a journey towards healing and resilience.',
      image: 'assets/depression-quiz.jpeg',
      route: 'depression-quiz'
    },
    {
      title: 'Word Search Game',
      description: 'Revitalize your mind with our Word Search Challenge! Dive into an immersive world of word discovery for a therapeutic escape. Sharpen cognitive skills, find joy in achievements, and experience the positive impact on your mental well-being. Play now for a healthier mind!',
      image: 'assets/word-search.jpeg',
      route: 'words-game'
    },
    {
      title: 'Memory Game',
      description: 'Exercise your brain with our Memory Boost Game! Enhance recall, sharpen focus, and enjoy a fun challenge for a brighter mind.',
      image: 'assets/memory-game.jpeg',
      route: 'memory-game'
    },
  ];

  navigateToGame(route: string): void {
    this.router.navigate([route]);
  }
}
