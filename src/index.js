import "./styles/style.scss";
import { moveElement, moveBackElement } from "./scripts/Helpers";
import { request } from "./scripts/Request";
import { Hangman } from "./scripts/Hangman";
let game;
const puzzle = document.querySelector(".puzzle__text");
const buttonStart = document.querySelector(".startButton");
const headerTitle = document.querySelector(".header__title");
const buttonReset = document.querySelector(".puzzle__reset");
headerTitle.innerHTML = headerTitle.textContent
  .split("")
  .map(letter => `<span>${letter}</span>`)
  .join("");

const spansHeader = headerTitle.querySelectorAll("span");
spansHeader.forEach(el => el.addEventListener("mouseover", moveElement));
spansHeader.forEach(el => el.addEventListener("mouseout", moveBackElement));

buttonStart.addEventListener("click", async () => {
  const text = await request(2);
  game = new Hangman(text, 5);
  game.render(puzzle);
  window.addEventListener("keydown", e => {
    const guess = e.key.toLowerCase();
    game.makeGuess(guess);
    game.setStatus();
    game.render(puzzle);
  });
});
buttonReset.addEventListener("click", async () => {
  if (game) {
    const text = await request(2);
    game.resetGame(text);
    game.render(puzzle);
  }
});
