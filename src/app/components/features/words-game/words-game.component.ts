import {Component, HostListener, OnDestroy} from '@angular/core';
import { Subject } from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'app-words-game',
  templateUrl: './words-game.component.html',
  styleUrls: ['./words-game.component.css'],
})
export class WordsGameComponent implements OnDestroy {
  constructor(private router: Router) {}

  private ngUnsubscribe = new Subject<void>();

  levels: { [key: number]: string[] } = {
    1: ['love', 'smile', 'happiness'],
    2: ['harmony', 'gratitude', 'joyful', 'hope'],
    3: ['positive', 'compassion', 'cherish', 'empathy', 'optimistic', 'kind', 'sweet', 'safe']
  };

  currentLevel: number = 1;
  levelOptions: number[] = Object.keys(this.levels).map(Number);

  wordsToFind: string[] = [];
  grid: string[][] = [];
  foundWords: string[] = [];
  userInput: string = '';
  errorMessage: string | null = null;
  congratulatoryMessage: string | null = null;
  gameStarted: boolean = false;

  ngOnInit(): void {
    // Initialize the game when the component is loaded
    this.resetGame();
    this.generateGrid();
  }

  ngOnDestroy(): void {
    this.resetGame();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  startGame(): void {
    this.gameStarted = true;
  }

  generateRandomDirection(): { row: number; col: number } {
    const directions = [
      { row: -1, col: 0 }, { row: 1, col: 0 }, { row: 0, col: -1 }, { row: 0, col: 1 },
      { row: -1, col: -1 }, { row: -1, col: 1 }, { row: 1, col: -1 }, { row: 1, col: 1 }
    ];

    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
  }

  generateGrid(): void {
    // Use the current level to get the words for that level
    this.wordsToFind = this.levels[this.currentLevel];

    // Find the length of the longest word
    const maxWordLength = Math.max(...this.wordsToFind.map(word => word.length));

    // Initialize a blank grid with as many rows as there are words and columns based on the longest word
    const numRows = this.wordsToFind.length;
    const numCols = maxWordLength;
    this.grid = Array.from({ length: numRows }, () => Array(numCols).fill(''));

    for (const word of this.wordsToFind) {
      let placed = false;

      while (!placed) {
        const direction = this.generateRandomDirection();
        const wordLength = word.length;

        let startRow: number = Math.floor(Math.random() * numRows);
        let startCol: number = Math.floor(Math.random() * numCols);

        // Check if the word can be placed in the grid
        const endRow = startRow + direction.row * (wordLength - 1);
        const endCol = startCol + direction.col * (wordLength - 1);

        if (
          endRow >= 0 && endRow < numRows &&
          endCol >= 0 && endCol < numCols
        ) {
          let validPlacement = true;

          for (let i = 0; i < wordLength; i++) {
            const newRow = startRow + direction.row * i;
            const newCol = startCol + direction.col * i;

            if (this.grid[newRow][newCol] && this.grid[newRow][newCol] !== word[i]) {
              validPlacement = false;
              break;
            }
          }

          if (validPlacement) {
            for (let i = 0; i < wordLength; i++) {
              const newRow = startRow + direction.row * i;
              const newCol = startCol + direction.col * i;
              this.grid[newRow][newCol] = word[i];
            }

            placed = true;
          }
        }
      }
    }

    // Fill empty spaces with random letters
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (this.grid[i][j] === '') {
          this.grid[i][j] = this.getRandomLetter();
        }
      }
    }
  }


  getRandomLetter(): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  checkWord(): void {
    const word = this.userInput.toLowerCase().trim();

    if (!this.gameStarted) {
      this.startGame();
    }

    if (word !== '') {
      if (this.wordsToFind.includes(word)) {
        if (this.foundWords.includes(word)) {
          this.errorMessage = `The word "${word}" was already found!`;
        } else {
          this.foundWords.push(word);
          this.highlightFoundWord(word);
          this.checkGameCompletion();
          this.errorMessage = null;
        }
      } else {
        this.errorMessage = `No such word found: ${word}`;
      }

      this.userInput = '';
    }
  }

  highlightFoundWord(word: string): void {
    const directions = [
      { row: -1, col: 0 }, { row: 1, col: 0 }, { row: 0, col: -1 }, { row: 0, col: 1 },
      { row: -1, col: -1 }, { row: -1, col: 1 }, { row: 1, col: -1 }, { row: 1, col: 1 }
    ];

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        const cellText = this.grid[i][j].toLowerCase();

        if (cellText === word[0]) {
          for (const direction of directions) {
            let found = true;

            const highlightedCells: { row: number, col: number }[] = [];

            for (let k = 0; k < word.length; k++) {
              const newRow = i + direction.row * k;
              const newCol = j + direction.col * k;

              // Check if the new position is within the grid boundaries
              if (newRow < 0 || newRow >= this.grid.length || newCol < 0 || newCol >= this.grid[i].length) {
                found = false;
                break;
              }

              const nextCellText = this.grid[newRow][newCol].toLowerCase();
              if (nextCellText !== word[k]) {
                found = false;
                break;
              }

              highlightedCells.push({ row: newRow, col: newCol });
            }

            if (found) {
              // Mark the cells for highlighting
              for (const cell of highlightedCells) {
                this.grid[cell.row][cell.col] = this.grid[cell.row][cell.col].toUpperCase();
              }
              return; // Stop searching for the word after it's found
            }
          }
        }
      }
    }
  }

  checkGameCompletion(): void {
    const wordsToFind = this.levels[this.currentLevel];

    if (this.foundWords.length === wordsToFind.length) {
      this.congratulatoryMessage = `Congratulations! All the words are found.`;

      // Trigger the next level
      this.goToNextLevel();
    }
  }

  // Method to go to the next level
  goToNextLevel(): void {
    const lastLevel = 3;

    if (this.currentLevel >= lastLevel) {
      console.log("You've completed all levels!");
      return; // Exit the function to prevent going to the next level
    }

    this.currentLevel++;
    this.resetGame();
    this.generateGrid(); // Generate a new grid for the new level
    this.startGame();
  }

  // Method to reset the game properties
  resetGame(): void {
    this.grid = [];
    this.foundWords = [];
    this.userInput = '';
    this.errorMessage = null;
    this.congratulatoryMessage = null;
    this.gameStarted = false;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    this.resetGame();
  }
  navigateToGames(): void {
    this.router.navigate(['games']);
  }

}





