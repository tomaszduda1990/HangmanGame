import { getLocal, renderHelper } from "./Helpers";
export class Hangman {
  constructor(word) {
    this.word = word.toLowerCase().split("");
    this.attempts = getLocal()
      ? getLocal()
      : {
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
    if (this.status === "playing") {
      this.attempts.fail++;
    }
    this.chances = 5;
    this.guessedLetters = [];
    this.status = "playing";
    this.word = text.toLowerCase().split("");
  }
  render(puzzleEl, attemptsEl, chancesEl) {
    const results = getLocal() ? getLocal() : "";
    const renderedText = renderHelper(
      this.status,
      this.word,
      this.guessedLetters
    );
    puzzleEl.innerHTML = renderedText.toUpperCase();
    chancesEl.textContent = `Chances left:[${this.chances}]`;
    console.log(results);
    if (results) {
      attemptsEl.innerHTML = `<span class="info__chances--success">${
        results.success
      }</span><span class="info__chances--fail">${results.fail}</span>`;
    }
  }
}
