import { playSoundFX } from "./sound.ts";
import {
  getBoardState,
  getComputersLevel,
  getCurrentPlayerTurnInPVC,
  NRO_CELLS,
  playerAction,
  updateGameStateOnComputerTurn,
  WINNING_COMBINATIONS,
  type BoardState,
} from "./store.ts";
import { arrayIntersection } from "./utils.ts";

let count = 0;

export function onTurnPVC() {
  setTimeout(() => {
    if (location.pathname !== "/pvc") return;

    console.log(
      "%cTURN",
      "padding: 0.1rem 0.5rem; border-radius: 0.5rem; background: oklch(44.6% 0.043 257.281); color: #fff;",
      getCurrentPlayerTurnInPVC.value,
    );

    if (getCurrentPlayerTurnInPVC.value === "computer") {
      updateGameStateOnComputerTurn().computerStartTurn();
      setTimeout(() => runComputer(), 250);
    } else if (getCurrentPlayerTurnInPVC.value === "player1") {
      updateGameStateOnComputerTurn().computerEndTurn();
    }
  }, 0);
}

export function runComputer() {
  const boardState = getBoardState.value;
  const randomToleranceNumber = Math.floor(Math.random() * 101);

  let tolerance = 0;
  if (getComputersLevel.value === "easy") {
    tolerance = 55;
  } else if (getComputersLevel.value === "medium") {
    tolerance = 30;
  } else {
    tolerance = 6;
  }

  if (randomToleranceNumber < tolerance) {
    const randomMove = lookForARandomEmptyCell(boardState);
    // console.log(
    //   `Random move -> ${randomMove}`,
    //   `Tolerance: ${tolerance}`,
    //   `Random Tolerance Number: ${randomToleranceNumber}`,
    // );
    playerAction().placeMark(randomMove);
    playSoundFX().pop();
    console.log(
      `%cReading one node ${count} times`,
      "padding: 0.1rem 0.5rem; border-radius: 0.5rem; background: oklch(48.8% 0.243 264.376); color: #fff;",
    );

    count = 0;
    return;
  }

  const bestMove = findBestMove(boardState);
  // console.log(
  //   `Best move -> ${bestMove}`,
  //   `Tolerance: ${tolerance}`,
  //   `Random Tolerance Number: ${randomToleranceNumber}`,
  // );
  playerAction().placeMark(bestMove);
  playSoundFX().pop();
  console.log(
    `%cReading one node ${count} times`,
    "padding: 0.1rem 0.5rem; border-radius: 0.5rem; background: oklch(48.8% 0.243 264.376); color: #fff;",
  );
  count = 0;
}

function lookForARandomEmptyCell(board: BoardState): number {
  const emptyCells: number[] = [];

  for (let i = 0; i < NRO_CELLS; i++) {
    const cell = board[i];
    if (getCurrentPlayerTurnInPVC.value === "computer" && cell && cell.cell === "empty") {
      emptyCells.push(i);
    }
  }

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex] ?? 0;
}

function evaluate(board: BoardState) {
  const playerValues: number[] = [];
  const computerValues: number[] = [];

  for (let i = 0; i < NRO_CELLS; i++) {
    const cell = board[i];
    if (cell && cell.player === "computer" && cell.cell === "mark") {
      computerValues.push(i);
    }
  }

  for (let i = 0; i < NRO_CELLS; i++) {
    const cell = board[i];
    if (cell && cell.player === "player1" && cell.cell === "mark") {
      playerValues.push(i);
    }
  }

  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const winningCombinationsList = WINNING_COMBINATIONS[i];
    if (winningCombinationsList === undefined) continue;

    const intersectedComputerValues = arrayIntersection(winningCombinationsList, computerValues);
    const intersectedPlayerValues = arrayIntersection(winningCombinationsList, playerValues);

    if (intersectedComputerValues.length === winningCombinationsList.length) {
      return 10;
    } else if (intersectedPlayerValues.length === winningCombinationsList.length) {
      return -10;
    }
  }

  return 0;
}

function isBoardFull(board: BoardState) {
  for (let i = 0; i < NRO_CELLS; i++) {
    const cell = board[i];
    if (cell && cell.cell === "empty") {
      return false;
    }
  }
  return true;
}

function minimax(board: BoardState, depth: number, isMaximizingPlayer: boolean, alpha: number, beta: number) {
  let score = evaluate(board);

  count++;

  if (score === 10) return score - depth;
  if (score === -10) return score + depth;
  if (isBoardFull(board)) return 0;

  if (isMaximizingPlayer) {
    let best = -1000;

    for (let i = 0; i < NRO_CELLS; i++) {
      const cell = board[i];
      if (cell && cell.cell === "empty") {
        cell.cell = "mark";
        cell.player = "computer";

        best = Math.max(best, minimax(board, depth + 1, !isMaximizingPlayer, alpha, beta));

        cell.cell = "empty";
        cell.player = null;

        alpha = Math.max(alpha, best);

        if (beta <= alpha) break;
      }
    }
    return best;
  } else {
    let best = 1000;

    for (let i = 0; i < NRO_CELLS; i++) {
      const cell = board[i];
      if (cell && cell.cell === "empty") {
        cell.cell = "mark";
        cell.player = "player1";

        best = Math.min(best, minimax(board, depth + 1, !isMaximizingPlayer, alpha, beta));

        cell.cell = "empty";
        cell.player = null;

        beta = Math.min(beta, best);

        if (beta <= alpha) break;
      }
    }
    return best;
  }
}

function findBestMove(board: BoardState) {
  let bestVal = -1_000;
  let bestMove = -1;

  for (let i = 0; i < NRO_CELLS; i++) {
    console.log(
      "%c:::: computer thinking",
      "padding: 0.1rem 0.5rem; border-radius: 0.5rem; background: oklch(52.5% 0.223 3.958); color: #fff;",
    );

    const cell = board[i];
    if (cell && cell.cell === "empty") {
      cell.cell = "mark";
      cell.player = "computer";

      let moveVal = minimax(board, 0, false, -1_000, 1_000);

      cell.cell = "empty";
      cell.player = null;

      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal;
      }
    }
  }

  return bestMove;
}
