import {
  getBoardState,
  getCurrentPlayerTurn,
  NRO_CELLS,
  playerAction,
  WINNING_COMBINATIONS,
  type BoardIndex,
} from "./store.svelte";

export function runComputer() {
  console.log(
    "%cCOMPUTER",
    "padding: 0.1rem 0.5rem; border-radius: 0.5rem; background: oklch(64.5% 0.246 16.439); color: #fff;",
    "is my turn",
  );

  const boardState = getBoardState();
  const emptyCells: number[] = [];

  lookForARandomEmptyCell();

  console.log(emptyCells);

  function lookForARandomEmptyCell() {
    for (let i = 0; i < NRO_CELLS; i++) {
      const c = boardState[i];
      if (getCurrentPlayerTurn() === "computer" && c.cell === "empty") {
        emptyCells.push(i);
      }
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const itemIndex = emptyCells[randomIndex];

    playerAction(itemIndex as BoardIndex).placeMark();
  }

  // unused, just for reference
  function lookForAWinner() {
    const playerBoard: number[] = [];

    for (let i = 0; i < NRO_CELLS; i++) {
      const c = boardState[i];
      if (c.player === getCurrentPlayerTurn() && c.cell === "mark") {
        playerBoard.push(i);
      }
    }

    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const oneWinScene = WINNING_COMBINATIONS[i];
      if (oneWinScene.every((value) => playerBoard.includes(value))) {
        return true;
      }
    }
    return false;
  }
}
