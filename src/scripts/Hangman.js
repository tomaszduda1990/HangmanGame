export class Hangman {
  constructor(word) {
    this.word = word.toLowerCase().split("");
    this.attempts = {
      success: 0,
      fail: 0
    };
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
    if (this.chances === 0 && this.status !== "fail") {
      this.status = "fail";
      this.attempts.fail++;
    } else if (finished && this.status !== "success") {
      this.status = "success";
      this.attempts.success++;
    }
  }
  resetGame(text) {
    this.chances = 5;
    this.guessedLetters = [];
    this.status = "playing";
    this.word = text.toLowerCase().split("");
  }
  render(element) {
    let renderedText = "";
    switch (this.status) {
      case "playing":
        if (this.status === "playing") {
          this.word.forEach(char => {
            if (this.guessedLetters.includes(char) || char === " ") {
              renderedText += char;
            } else {
              renderedText += "*";
            }
          });
        }
        break;
      case "fail":
        renderedText = `You lost. The answer is "${this.word.join("")}"`;
        break;
      case "success":
        renderedText = "You won! Play Again";
        break;
    }
    element.textContent = renderedText.toUpperCase();
    console.log(this.attempts);
  }
}
