import { animate } from "motion";

const homeSection = document.querySelector("#home");
const gameSection = document.querySelector("#game");
const btnPvp = document.querySelector("#btn-pvp");

const boxes = document.querySelectorAll(".cell");

btnPvp.addEventListener("click", () => {
  homeSection.setAttribute("hidden", "");
  gameSection.removeAttribute("hidden");

  // To refactor
  boxes.forEach((box, index) => {
    animate(
      box,
      { scale: [0, 1] },
      {
        delay: index * 0.075, // stagger by 0.2s
        duration: 1.2,
        type: "spring",
        stiffness: 180,
        damping: 15,
        mass: 1,
      },
    );
  });
});

export function setInputListener(cells, onCellClick) {
  for (let i = 0; i < 9; i++) {
    cells[i].addEventListener("click", () => onCellClick(i));
  }
}
