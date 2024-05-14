import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

interface Card {
  value: string;
  flipped: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.css']
})
export class MemoryGameComponent implements OnInit {
  congratulatoryMessage: string = "";
  timerStarted: boolean = false;
  startTime: number = 0;
  endTime: number = 0;
  elapsedTime: number = 0;
  timerInterval: any;
  imageWon = "/assets/Win.png";
  cards: Card[] = [
    { value: "Happy", flipped: false, matched: false },
    { value: "Love", flipped: false, matched: false },
    { value: "Joy", flipped: false, matched: false },
    { value: "Smile", flipped: false, matched: false },
    { value: "Happy", flipped: false, matched: false },
    { value: "Love", flipped: false, matched: false },
    { value: "Joy", flipped: false, matched: false },
    { value: "Smile", flipped: false, matched: false },
    { value: "Awareness", flipped: false, matched: false },
    { value: "Time", flipped: false, matched: false },
    { value: "Awareness", flipped: false, matched: false },
    { value: "Time", flipped: false, matched: false },
    { value: "Success", flipped: false, matched: false },
    { value: "Hope", flipped: false, matched: false },
    { value: "Dream", flipped: false, matched: false },
    { value: "Courage", flipped: false, matched: false },
    { value: "Success", flipped: false, matched: false },
    { value: "Hope", flipped: false, matched: false },
    { value: "Dream", flipped: false, matched: false },
    { value: "Courage", flipped: false, matched: false }
  ];

  shuffledCards: Card[] = [];

  firstFlippedCard: Card | null = null;
  secondFlippedCard: Card | null = null;

  // Add a flag to control visibility of the game board
  showGameBoard: boolean = true;

  // Add a flag to control visibility of the timer
  showTimer: boolean = true;

  // Add a flag to control visibility of the congratulatory message
  showCongratulatoryMessage: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.resetGame();
  }

  formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  resetGame(): void {
    this.cards.forEach(card => {
      card.flipped = false;
      card.matched = false;
    });

    // Reset timer
    this.timerStarted = false;
    this.elapsedTime = 0;
    clearInterval(this.timerInterval); // Clear any running timer interval

    this.shuffleCards();
    this.showCongratulatoryMessage = false;
  }

  shuffleCards(): void {
    this.shuffledCards = this.shuffleArray([...this.cards]);
  }

  shuffleArray(array: any[]): any[] {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  handleCardClick(clickedCard: Card): void {
    if (!clickedCard.flipped && !this.secondFlippedCard && this.flippedCardsCount() < 2) {
      // Flip the clicked card
      clickedCard.flipped = true;

      if (!this.timerStarted) {
        // Start the timer
        this.timerStarted = true;
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
          this.elapsedTime = Date.now() - this.startTime;
        }, 1000);
      }

      if (!this.firstFlippedCard) {
        // First card flip
        this.firstFlippedCard = clickedCard;
      } else {
        // Second card flip
        this.secondFlippedCard = clickedCard;

        // Check for a match after a short delay
        setTimeout(() => {
          this.checkForMatch();
        }, 500);
      }
    }
  }

  checkForMatch(): void {
    if (this.firstFlippedCard && this.secondFlippedCard) {
      const isMatch = this.firstFlippedCard.value === this.secondFlippedCard.value;

      if (isMatch) {
        this.shuffledCards
          .filter(card => card.flipped && !card.matched)
          .forEach(card => (card.matched = true));

        if (this.shuffledCards.every(card => card.matched)) {
          clearInterval(this.timerInterval);
          this.endTime = Date.now();
          this.elapsedTime = this.endTime - this.startTime;
          this.showCongratulatoryMessage = true;
          this.congratulatoryMessage = this.getCongratulatoryMessage();
          this.showGameBoard = false;
          this.showTimer = false;
        }
      } else {
        this.shuffledCards
          .filter(card => card.flipped && !card.matched)
          .forEach(card => (card.flipped = false));
      }

      this.firstFlippedCard = null;
      this.secondFlippedCard = null;
    }
  }

  flippedCardsCount(): number {
    return this.shuffledCards.filter(card => card.flipped && !card.matched).length;
  }

  getCongratulatoryMessage(): string {
    const messages = [
      "Great job on matching all the cards! Your memory is amazing!",
      "Fantastic! You've matched all the cards!",
      "Perfect match! You're a memory master!",
    ];

    // Pick a random message
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }

  getResultImage(): string {
    return this.imageWon;
  }

  playAgain(): void {
    this.resetGame();
  }

  navigateToGames(): void {
    this.router.navigate(['games']);
  }
}
