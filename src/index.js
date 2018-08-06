import "./styles/style.scss";
import { moveElement, moveBackElement } from "./scripts/Helpers";
import { request } from "./scripts/Request";
import { Hangman } from "./scripts/Hangman";
import { setLocal, getLocal } from "./scripts/Helpers";

let game;
const puzzleContainer = document.querySelector(".puzzle");
const puzzle = puzzleContainer.querySelector(".puzzle__text");
const resetStatsBtn = document.querySelector(".resetStats");
const buttonStart = document.querySelector(".startButton");
const headerTitle = document.querySelector(".header__title");
const buttonReset = document.querySelector(".puzzle__resetButton");
const chancesEl = document.querySelector(".info__chances");
const results = document.querySelector(".info__results");

headerTitle.innerHTML = headerTitle.textContent
  .split("")
  .map(letter => `<span>${letter}</span>`)
  .join("");

const spansHeader = headerTitle.querySelectorAll("span");
spansHeader.forEach(el => el.addEventListener("mouseover", moveElement));
spansHeader.forEach(el => el.addEventListener("mouseout", moveBackElement));

buttonStart.addEventListener("click", async e => {
  e.target.disabled = true;
  const text = await request(2);
  game = new Hangman(text, 5);
  setLocal(game.attempts);
  game.render(puzzle, chancesEl, results);
  window.addEventListener("keydown", e => {
    const guess = e.key.toLowerCase();
    game.makeGuess(guess);
    game.setStatus();
    game.render(puzzle, chancesEl, results);
  });
});
buttonStart.addEventListener("transitionend", function(e) {
  if (e.propertyName === "transform") {
    this.style.display = "none";
    puzzleContainer.classList.add("puzzle--active");
  }
});
buttonReset.addEventListener("click", async () => {
  if (game) {
    const text = await request(2);
    puzzleContainer.dataset.jump = "true";
    game.resetGame(text);
    setLocal(game.attempts);
    game.render(puzzle, chancesEl, results);
  }
});

resetStatsBtn.addEventListener("click", () => {
  if (game) {
    const resetResult = {
      success: 0,
      fail: 0
    };
    game.attempts = resetResult;
    setLocal(resetResult);
    game.render(puzzle, chancesEl, results);
  }
});

window.addEventListener("animationend", e => {
  console.log(e.animationName);
  if (e.animationName === "letterJump" && !e.target.nextSibling) {
    console.log(e.target);
    console.log(e.target.nextSibling);
    console.log("------------------------------");
    puzzleContainer.dataset.jump = "false";
  } else if (e.animationName === "success") {
    results.classList.remove("info__results--success");
  } else if (e.animationName === "fail") {
    results.classList.remove("info__results--fail");
  }
});
