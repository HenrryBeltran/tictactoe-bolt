import { page } from "$app/state";

export type BoardState = {
  cell: "empty" | "mark" | "dead";
  player: "player1" | "player2" | "computer" | null;
  life: number;
}[];
export type BoardIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type ComputerDifficulty = "easy" | "medium" | "hard";

export const MARK_LIFE = 2;
export const NRO_CELLS = 9;
export const TIMER_AFTER_WIN = 3_500;
export const WINNING_COMBINATIONS = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

let gameState = $state<"idle" | "playing" | "cpu_thinking" | "restarting">("idle");
let currentTurn = $state(0);
let whoStartedFirst = $state<"player1" | "player2" | "computer">("player1");
let player1Stats = $state({ name: "Player 1", score: 0 });
let player2Stats = $state({ name: "Player 2", score: 0 });
let computerStats = $state({ name: "Computer", score: 0 });
let computersLevel = $state<ComputerDifficulty>("medium");
let boardState = $state<BoardState>([
  { cell: "empty", player: null, life: MARK_LIFE },
  { cell: "empty", player: null, life: MARK_LIFE },
  { cell: "empty", player: null, life: MARK_LIFE },
  { cell: "empty", player: null, life: MARK_LIFE },
  { cell: "empty", player: null, life: MARK_LIFE },
  { cell: "empty", player: null, life: MARK_LIFE },
  { cell: "empty", player: null, life: MARK_LIFE },
  { cell: "empty", player: null, life: MARK_LIFE },
  { cell: "empty", player: null, life: MARK_LIFE },
]);
let winner = $state<"player1" | "player2" | "computer" | null>(null);

export function getBoardState() {
  return boardState;
}

export function getGameState() {
  return gameState;
}

export function getWinner() {
  return winner;
}

export function getCurrentPlayerTurn() {
  if (page.url.pathname === "/pvc") {
    return currentTurn % 2 === 0 ? "player1" : "computer";
  }
  return currentTurn % 2 === 0 ? "player1" : "player2";
}

export function getCurrentPlayerName() {
  if (page.url.pathname === "/pvc") {
    return currentTurn % 2 === 0 ? player1Stats.name : "Computer";
  }
  return currentTurn % 2 === 0 ? player1Stats.name : player2Stats.name;
}

export function getPlayersName() {
  return {
    player1: () => player1Stats.name,
    player2: () => player2Stats.name,
    computer: () => "Computer",
    byAlias: (alias: "player1" | "player2" | "computer") => {
      switch (alias) {
        case "player1":
          return player1Stats.name;
        case "player2":
          return player2Stats.name;
        case "computer":
          return "Computer";
      }
    },
  };
}

export function getScores() {
  return {
    player1: () => player1Stats.score,
    player2: () => player2Stats.score,
    computer: () => computerStats.score,
  };
}

export function getComputersLevel() {
  return computersLevel;
}

export function playerAction(index: BoardIndex = 0) {
  return {
    placeMark: () => {
      console.log("executing", index);
      if (gameState === "restarting") {
        return { blocked: true };
      }

      const currentPlayerTurn = getCurrentPlayerTurn();

      if (boardState[index].cell !== "empty") {
        return { blocked: true };
      }

      if (gameState === "idle") {
        gameState = "playing";
      }

      for (let i = 0; i < NRO_CELLS; i++) {
        if (i === index) {
          continue;
        }

        if (boardState[i].cell === "dead") {
          boardState[i].cell = "empty";
          boardState[i].life = MARK_LIFE;
        }

        if (
          boardState[i].cell === "mark" &&
          boardState[i].player === currentPlayerTurn &&
          boardState[i].life !== 0
        ) {
          boardState[i].life -= 1;
        } else if (
          boardState[i].cell === "mark" &&
          boardState[i].player === currentPlayerTurn &&
          boardState[i].life === 0
        ) {
          boardState[i].cell = "dead";
        }
      }

      boardState[index].cell = "mark";
      boardState[index].player = currentPlayerTurn;

      const foundWinner = lookForAWinner();
      if (!foundWinner) {
        nextTurn();
        return { blocked: false };
      }

      switch (currentPlayerTurn) {
        case "player1":
          player1Stats.score += 1;
          winner = "player1";
          console.log(
            "%cPLAYER 1",
            "padding: 0.1rem 0.5rem; border-radius: 0.5rem; background: oklch(68.5% 0.169 237.323); color: #fff;",
            player1Stats.score,
          );
          break;
        case "player2":
          player2Stats.score += 1;
          winner = "player2";
          console.log(
            "%cPLAYER 2",
            "padding: 0.1rem 0.5rem; border-radius: 0.5rem; background: oklch(64.5% 0.246 16.439); color: #fff;",
            player2Stats.score,
          );
          break;
        case "computer":
          computerStats.score += 1;
          winner = "computer";
          console.log(
            "%cCOMPUTER",
            "padding: 0.1rem 0.5rem; border-radius: 0.5rem; background: oklch(64.5% 0.246 16.439); color: #fff;",
            player2Stats.score,
          );
          break;
      }

      restartingGameAfterTheWinner();
      return { blocked: false };
    },
    quickRestart: () => {
      if (gameState === "restarting") {
        cancelRestartingTimeout();
      }
    },
    editName: (newName: string, player: "player1" | "player2") => {
      if (player === "player1") {
        player1Stats.name = newName;
      } else if (player === "player2") {
        player2Stats.name = newName;
      }
    },
    changeComputerDifficulty: (difficulty: ComputerDifficulty) => {
      if (difficulty !== "easy" && difficulty !== "medium" && difficulty !== "hard") {
        computersLevel = "medium";
      } else {
        computersLevel = difficulty;
      }
    },
    clearGame: () => {
      clearBoard();
      player1Stats.score = 0;
      player2Stats.score = 0;
      computerStats.score = 0;
      currentTurn = 0;
    },
  };
}

export function updateGameStateOnComputerTurn() {
  return {
    computerStartTurn: () => (gameState = "cpu_thinking"),
    computerEndTurn: () => {
      if (lookForAWinner()) {
        gameState = "restarting";
      } else {
        gameState = "playing";
      }
    },
  };
}

function nextTurn() {
  currentTurn += 1;
}

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

let timeoutId: number;

function restartingGameAfterTheWinner() {
  gameState = "restarting";
  timeoutId = setTimeout(() => {
    clearBoard();
  }, TIMER_AFTER_WIN);
}

function cancelRestartingTimeout() {
  clearTimeout(timeoutId);
  clearBoard();
}

function clearBoard() {
  boardState = [
    { cell: "empty", player: null, life: MARK_LIFE },
    { cell: "empty", player: null, life: MARK_LIFE },
    { cell: "empty", player: null, life: MARK_LIFE },
    { cell: "empty", player: null, life: MARK_LIFE },
    { cell: "empty", player: null, life: MARK_LIFE },
    { cell: "empty", player: null, life: MARK_LIFE },
    { cell: "empty", player: null, life: MARK_LIFE },
    { cell: "empty", player: null, life: MARK_LIFE },
    { cell: "empty", player: null, life: MARK_LIFE },
  ];
  if (whoStartedFirst === "player1") {
    currentTurn = 1;

    whoStartedFirst = page.url.pathname === "/pvc" ? "computer" : "player2";
  } else {
    currentTurn = 0;
    whoStartedFirst = "player1";
  }
  winner = null;
  gameState = "idle";
}
