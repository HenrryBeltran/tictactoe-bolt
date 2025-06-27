// js/store.js
import { signal } from "./signals.js";

export const PLAYER = {
  one: 0,
  two: 1,
};

export const CELL_STATE = {
  empty: "empty",
  played: "played",
  dead: "dead",
};

export const GAME_STATE = {
  playing: "playing",
  finish: "finish",
};

// Win scenarios for 3x3 tic tac toe
export const WIN_SCENARIOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Create board with signals
function createBoard() {
  return Array.from({ length: 9 }).map(() => ({
    value: signal(null), // PLAYER.one, PLAYER.two or null
    state: signal(CELL_STATE.empty), // empty, played, dead
  }));
}

export const boardState = {
  board: createBoard(),

  resetBoard() {
    this.board.forEach((cell) => {
      cell.value.value = null;
      cell.state.value = CELL_STATE.empty;
    });
  },
};

export const gameState = {
  currentPlayerTurn: signal(PLAYER.one),
  state: signal(GAME_STATE.playing),
  winner: signal(null),
  gamesPlayed: signal(0),

  player1: {
    score: 0,
  },
  player2: {
    score: 0,
  },

  resetGame() {
    this.currentPlayerTurn.value = this.gamesPlayed.value % 2 === 0 ? PLAYER.one : PLAYER.two;
    this.state.value = GAME_STATE.playing;
    this.winner.value = null;
  },
};
