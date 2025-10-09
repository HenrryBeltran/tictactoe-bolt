import { page } from "$app/state";
import {
  getBoardState,
  getComputersLevel,
  getCurrentPlayerTurn,
  NRO_CELLS,
  playerAction,
  updateGameStateOnComputerTurn,
  WINNING_COMBINATIONS,
  type BoardIndex,
  type BoardState,
} from "./store.svelte";
import { arrayIntersection } from "./utils";

let count = 0;

export function onTurnPVC() {
  if (page.url.pathname !== "/pvc") return;

  console.log(
    "%cTURN",
    "padding: 0.1rem 0.5rem; border-radius: 0.5rem; background: oklch(44.6% 0.043 257.281); color: #fff;",
    getCurrentPlayerTurn(),
  );

  if (getCurrentPlayerTurn() === "computer") {
    updateGameStateOnComputerTurn().computerStartTurn();
    setTimeout(() => runComputer(), 250);
  } else if (getCurrentPlayerTurn() === "player1") {
    updateGameStateOnComputerTurn().computerEndTurn();
  }
}

export function runComputer() {
  const boardState = getBoardState();
  const randomNumber = Math.floor(Math.random() * 101);

  let tolerance = 0;
  if (getComputersLevel() === "easy") {
    tolerance = 55;
  } else if (getComputersLevel() === "medium") {
    tolerance = 30;
  } else {
    tolerance = 6;
  }

  if (randomNumber < tolerance) {
    const randomMove = lookForARandomEmptyCell(boardState);
    console.log("Random move ->", randomMove, tolerance, randomNumber);
    playerAction(randomMove as BoardIndex).placeMark();
    console.log("reading one node", count);
    count = 0;
    return;
  }

  const bestMove = findBestMove(boardState);
  console.log("Best move ->", bestMove, tolerance, randomNumber);
  playerAction(bestMove as BoardIndex).placeMark();
  console.log("reading one node", count);
  count = 0;
}

function lookForARandomEmptyCell(boardState: BoardState) {
  const emptyCells: number[] = [];

  for (let i = 0; i < NRO_CELLS; i++) {
    const c = boardState[i];
    if (getCurrentPlayerTurn() === "computer" && c.cell === "empty") {
      emptyCells.push(i);
    }
  }

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
}

function evaluate(board: BoardState) {
  const playerValues: number[] = [];
  const computerValues: number[] = [];

  for (let i = 0; i < NRO_CELLS; i++) {
    if (board[i].player === "computer" && board[i].cell === "mark") {
      computerValues.push(i);
    }
  }

  for (let i = 0; i < NRO_CELLS; i++) {
    if (board[i].player === "player1" && board[i].cell === "mark") {
      playerValues.push(i);
    }
  }

  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const intersectedComputerValues = arrayIntersection(WINNING_COMBINATIONS[i], computerValues);
    const intersectedPlayerValues = arrayIntersection(WINNING_COMBINATIONS[i], playerValues);

    if (intersectedComputerValues.length === WINNING_COMBINATIONS[i].length) {
      return 10;
    } else if (intersectedPlayerValues.length === WINNING_COMBINATIONS[i].length) {
      return -10;
    }
  }

  return 0;
}

function isBoardFull(board: BoardState) {
  for (let i = 0; i < NRO_CELLS; i++) {
    if (board[i].cell === "empty") {
      return false;
    }
  }
  return true;
}

function minimax(board: BoardState, depth: number, isMaximizingPlayer: boolean) {
  let score = evaluate(board);

  count++;

  if (score === 10) return score - depth;

  if (score === -10) return score + depth;

  if (isBoardFull(board)) return 0;

  if (isMaximizingPlayer) {
    let best = -1000;

    for (let i = 0; i < NRO_CELLS; i++) {
      if (board[i].cell === "empty") {
        board[i].cell = "mark";
        board[i].player = "computer";

        best = Math.max(best, minimax(board, depth + 1, !isMaximizingPlayer));

        board[i].cell = "empty";
        board[i].player = null;
      }
    }
    return best;
  } else {
    let best = 1000;

    for (let i = 0; i < NRO_CELLS; i++) {
      if (board[i].cell === "empty") {
        board[i].cell = "mark";
        board[i].player = "player1";

        best = Math.min(best, minimax(board, depth + 1, !isMaximizingPlayer));

        board[i].cell = "empty";
        board[i].player = null;
      }
    }
    return best;
  }
}

function findBestMove(board: BoardState) {
  let bestVal = -1000;
  let bestMove = -1;

  for (let i = 0; i < NRO_CELLS; i++) {
    if (board[i].cell === "empty") {
      board[i].cell = "mark";
      board[i].player = "computer";

      let moveVal = minimax(board, 0, false);

      board[i].cell = "empty";
      board[i].player = null;

      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal;
      }
    }
  }

  return bestMove;
}
