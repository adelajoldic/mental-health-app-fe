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
      title: 'Mood Meter Quiz',
      description: 'Asses your current mood',
      image: 'assets/knowledge-game.jpeg',
      route: 'quiz'
    },
    {
      title: 'Anxiety Quiz',
      description: 'Gain skills for anxiety management',
      image: 'assets/anxiety-quiz.jpeg',
      route: 'anxiety-quiz'
    },
    {
      title: 'Depression Quiz',
      description: 'Learn about depression management',
      image: 'assets/depression-quiz.jpeg',
      route: 'depression-quiz'
    },
    {
      title: 'Word Search Game',
      description: 'Uncover hidden words',
      image: 'assets/word-search.jpeg',
      route: 'words-game'
    },
    {
      title: 'Memory Game',
      description: 'Boost your memory cells',
      image: 'assets/memory-game.jpeg',
      route: 'memory-game'
    },
  ];

  navigateToGame(route: string): void {
    this.router.navigate([route]);
  }
}
