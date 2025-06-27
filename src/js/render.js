import { boardState, CELL_STATE, gameState, PLAYER } from "./store.js";

const cells = document.querySelectorAll(".cell");

const circle = `
  <svg class="w-full h-full p-px fill-sky-500 data-[dead]:opacity-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47 47">
    <path d="M23.5,0C10.52,0,0,10.52,0,23.5s10.52,23.5,23.5,23.5,23.5-10.52,23.5-23.5S36.48,0,23.5,0ZM23.5,39c-8.56,0-15.5-6.94-15.5-15.5s6.94-15.5,15.5-15.5,15.5,6.94,15.5,15.5-6.94,15.5-15.5,15.5Z" />
  </svg>
`;

const cross = `
  <svg class="w-full h-full p-px fill-rose-500 data-[dead]:opacity-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.41 38.41">
    <rect x="15.74" y="-6.52" width="6.92" height="51.45" rx="3.46" ry="3.46" transform="translate(19.2 -7.95) rotate(45)" />
    <rect x="15.74" y="-6.52" width="6.92" height="51.45" rx="3.46" ry="3.46" transform="translate(46.36 19.2) rotate(135)" />
  </svg>
`;

// Clear classes from all cells (helper)
function clearCellHighlights() {
  cells.forEach((cell) => {
    cell.classList.remove("bg-neutral-300/75", "bg-sky-300/70", "bg-rose-300/70");
  });
}

export function renderBoard() {
  const board = boardState.board;
  clearCellHighlights();

  for (let i = 0; i < board.length; i++) {
    const cell = cells[i];
    const cellData = board[i];
    cell.innerHTML = ""; // clear old SVG

    if (cellData.value.value === null) {
      // empty cell styling
      cell.classList.add("bg-neutral-300/75");
      continue;
    }

    // Insert SVG based on player
    if (cellData.value.value === PLAYER.one) {
      cell.insertAdjacentHTML("beforeend", circle);
    } else if (cellData.value.value === PLAYER.two) {
      cell.insertAdjacentHTML("beforeend", cross);
    }

    // If dead, make svg transparent 0.5
    if (cellData.state.value === CELL_STATE.dead) {
      cell.children[0].style.opacity = "0.5";
    } else {
      cell.children[0].style.opacity = "1";
    }
  }
}

export function highlightWinningCells(winCells) {
  clearCellHighlights();
  winCells.forEach((i) => {
    cells[i].classList.remove("bg-neutral-300/75");
    if (gameState.currentPlayerTurn.value === PLAYER.one) {
      cells[i].classList.add("bg-sky-300/70");
    } else {
      cells[i].classList.add("bg-rose-300/70");
    }
  });
}
