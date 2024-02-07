import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-words-game',
  templateUrl: './words-game.component.html',
  styleUrls: ['./words-game.component.css']
})
export class WordsGameComponent {


  wordsToFind: string[] = ['apple', 'banana', 'grape', 'orange', 'kiwi'];
  grid: string[][] = [
    ['a', 'p', 'p', 'l', 'e'],
    ['b', 'a', 'n', 'a', 'n', 'a'],
    ['g', 'r', 'a', 'p', 'e'],
    ['o', 'r', 'a', 'n', 'g', 'e'],
    ['k', 'i', 'w', 'i']
  ];
  foundWords: string[] = [];
  userInput: string = '';
  errorMessage: string | null = null;
  congratulatoryMessage: string | null = null;
  timer: number = 0;
  timerInterval: any;
  gameStarted: boolean = false;
  showTimer: boolean = true;
  displayTimeTaken: boolean = false;
  elapsedTime: number = 0;
  constructor() {}

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      this.timer++;
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.timerInterval);
    this.timerInterval = null; // Set timerInterval to null when stopping the timer
  }

  startGame(): void {
    this.gameStarted = true;
  }

  checkWord(): void {
    const word = this.userInput.toLowerCase();

    if (!this.gameStarted) {
      this.startGame();
      this.startTimer(); // Start the timer when the game begins
    }

    if (word.trim() !== '') {
      if (this.wordsToFind.includes(word) && !this.foundWords.includes(word)) {
        this.foundWords.push(word);
        console.log(`Found word: ${word}`);
        this.highlightFoundWord(word);
        this.checkGameCompletion();
        this.errorMessage = null; // Clear error message on correct word
      } else {
        console.log(`Word not found: ${word}`);
        this.errorMessage = `No such word found: ${word}`;
      }

      // Clear the input after checking the word
      this.userInput = '';
    }
  }

  highlightFoundWord(word: string): void {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        const cellText = this.grid[i][j].toLowerCase();

        if (cellText === word[0]) {
          let found = true;

          for (let k = 1; k < word.length; k++) {
            const nextCellText = this.grid[i][j + k].toLowerCase();
            if (!nextCellText || nextCellText !== word[k]) {
              found = false;
              break;
            }
          }

          if (found) {
            for (let k = 0; k < word.length; k++) {
              this.grid[i][j + k] = this.grid[i][j + k].toUpperCase();
            }
            return; // Stop searching for the word after it's found
          }
        }
      }
    }
  }
  checkGameCompletion(): void {
    if (this.foundWords.length === this.wordsToFind.length) {
      this.stopTimer();
      this.congratulatoryMessage = `Congratulations! All the words are found.`;
      this.displayTimeTaken = true;
      this.elapsedTime = this.timer; // Store the elapsed time
    }
  }
}
