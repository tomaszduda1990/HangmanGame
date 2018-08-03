export const moveElement = e => {
  e.target.classList.add("moveSpan");
};

export const moveBackElement = e => {
  e.target.classList.remove("moveSpan");
};

export const setLocal = obj => {
  console.log(obj);
  const json = JSON.stringify(obj);
  console.log(json);
  localStorage.setItem("result", json);
};

export const getLocal = () => {
  const string = localStorage.getItem("result");
  console.log(string);
  const data = JSON.parse(string);
  return data;
};

export const renderHelper = (status, word, guessedLetters) => {
  let renderedText = "";
  switch (status) {
    case "playing":
      if (status === "playing") {
        word.forEach(char => {
          if (guessedLetters.includes(char) || char === " ") {
            renderedText += `<span>${char}</span>`;
          } else {
            renderedText += "<span>*</span>";
          }
        });
      }
      return renderedText;
    case "fail":
      return (renderedText = `You lost. The answer is "${word.join("")}"`);
    case "success":
      return (renderedText = "You won! Play Again");
    default:
      return;
  }
};
