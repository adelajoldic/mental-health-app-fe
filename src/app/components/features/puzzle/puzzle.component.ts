import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {RandomService} from "../../../services/random.service";
import {Router} from "@angular/router";

interface Card {
  value: string;
  flipped: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {
  constructor(private router:Router) {
  }
  showCongratulatoryMessage: boolean = false;
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
    // Add more cards as needed
  ];

  shuffledCards: Card[] = [];

  firstFlippedCard: Card | null = null;
  secondFlippedCard: Card | null = null;

  navigateToGames() {
    const path = "games"
    this.router.navigate([path])
  }

  ngOnInit() {
    this.resetGame();
  }

  resetGame(): void {
    this.cards.forEach(card => {
      card.flipped = false;
      card.matched = false;
    });

    this.shuffleCards();
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

      if (!this.firstFlippedCard) {
        // First card flip
        this.firstFlippedCard = clickedCard;
      } else {
        // Second card flip
        this.secondFlippedCard = clickedCard;

        // Check for a match after a short delay
        setTimeout(() => this.checkForMatch(), 500);
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

        // Check if all cards are matched
        if (this.shuffledCards.every(card => card.matched)) {
          alert("Congratulations! You've matched all pairs.");
          // Optionally, reset the game for a new round
          this.resetGame();
        }
      } else {
        // If no match, flip cards back
        this.shuffledCards
          .filter(card => card.flipped && !card.matched)
          .forEach(card => (card.flipped = false));
      }

      // Reset flipped cards for the next turn
      this.firstFlippedCard = null;
      this.secondFlippedCard = null;
    }
  }

  flippedCardsCount(): number {
    return this.shuffledCards.filter(card => card.flipped && !card.matched).length;
  }

  areAllCardsMatched(): boolean {
    return this.shuffledCards.every(card => card.matched);
  }

  getCongratulatoryMessage(): string {
    const messages = [
      "Great job!",
      "Congratulations!",
      "Well done!",
      "Fantastic!",
      "You're a memory master!",
      "Perfect match!",
    ];

    // Pick a random message
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }

  getResultImage(): string {
    return this.imageWon;
  }
}
