export class Hangman {
  constructor(word) {
    this.word = word.toLowerCase().split("");
    this.attempts = 0;
    this.chances = 5;
    this.guessedLetters = [];
    this.status = "playing";
  }
  makeGuess(letter) {
    const isUnique = !this.guessedLetters.includes(letter);
    const badGuess = !this.word.includes(letter);

    if (this.status === "playing") {
      if (isUnique && badGuess) {
        this.chances--;
      } else if (isUnique) {
        this.guessedLetters.push(letter);
      }
    } else {
      return;
    }
  }
  setStatus() {
    const finished = this.word.every(
      letter => this.guessedLetters.includes(letter) || letter === " "
    );
    if (this.chances === 0) {
      this.status = "fail";
    } else if (finished) {
      this.status = "success";
    }
  }
  resetGame(text) {
    this.chances = 5;
    this.attempts++;
    this.guessedLetters = [];
    this.status = "playing";
    this.word = text.toLowerCase().split("");
  }
  render(element) {
    let renderedText = "";
    this.word.forEach(char => {
      if (this.guessedLetters.includes(char) || char === " ") {
        renderedText += char;
      } else {
        renderedText += "*";
      }
    });
    element.textContent = renderedText.toUpperCase();
  }
}
