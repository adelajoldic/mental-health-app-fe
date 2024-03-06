import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-words-game',
  templateUrl: './words-game.component.html',
  styleUrls: ['./words-game.component.css']
})
export class WordsGameComponent {
  // Define words for each level
  levels: { [key: number]: string[] } = {
    1: ['love', 'smile', 'happiness', 'joy'],
    2: ['harmony', 'gratitude', 'joyful', 'soft', 'hopeful', 'bliss'],
    3: ['positive', 'compassion', 'cherish', 'empathy', 'optimistic', 'kind', 'sweet', 'fun', 'safe', 'free']
  };
  // , 'empower', 'success'],
  // , 'nice', 'wise'

  // Set default level to 1
  currentLevel: number = 1;

  wordsToFind: string[] = [];
  grid: string[][] = [];
  foundWords: string[] = [];
  userInput: string = '';
  errorMessage: string | null = null;
  congratulatoryMessage: string | null = null;
  timer: number = 0;
  timerInterval: any;
  gameStarted: boolean = false;
  displayTimeTaken: boolean = false;
  elapsedTime: number = 0;

  ngOnInit(): void {
    this.generateGrid();
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
    this.timerInterval = null;
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
    this.grid = Array.from({ length: this.wordsToFind.length }, () => Array(maxWordLength).fill(''));

    for (const word of this.wordsToFind) {
      let placed = false;

      while (!placed) {
        const direction = this.generateRandomDirection();
        const wordLength = word.length;

        let startRow: number;
        let startCol: number;

        startRow = Math.floor(Math.random() * this.grid.length);
        startCol = Math.floor(Math.random() * this.grid[startRow].length);

        const endRow = startRow + direction.row * (wordLength - 1);
        const endCol = startCol + direction.col * (wordLength - 1);

        if (
          endRow >= 0 && endRow < this.grid.length &&
          endCol >= 0 && endCol < this.grid[startRow].length
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
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
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
      this.startTimer();
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
      this.stopTimer();
      this.congratulatoryMessage = `Congratulations! All the words are found.`;
      this.displayTimeTaken = true;
      this.elapsedTime = this.timer;

      // Trigger the next level
      this.goToNextLevel();
    }
  }

// Method to go to the next level
  goToNextLevel(): void {
    this.currentLevel++;

    if (this.currentLevel > Object.keys(this.levels).length) {
      console.log("You've completed all levels!");
      // Optionally, you can reset the game or perform other actions here
    } else {
      this.resetGame();
      this.generateGrid(); // Ensure to generate a new grid for the new level
      this.startGame();
    }
  }

  // Method to reset the game properties
  resetGame(): void {
    this.grid = [];
    this.foundWords = [];
    this.userInput = '';
    this.errorMessage = null;
    this.congratulatoryMessage = null;
    this.timer = 0;
    this.elapsedTime = 0;
    this.displayTimeTaken = false;
    this.gameStarted = false;
  }
}

