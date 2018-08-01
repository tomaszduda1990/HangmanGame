export const moveElement = e => {
  e.target.classList.add("moveSpan");
};

export const moveBackElement = e => {
  e.target.classList.remove("moveSpan");
};
