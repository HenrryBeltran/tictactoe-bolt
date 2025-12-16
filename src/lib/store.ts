import { computed, reactive, ref } from "vue";

export type BoardState = {
  cell: "empty" | "mark" | "dead";
  player: "player1" | "player2" | "computer" | null;
  life: number;
}[];
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

let gameState = ref<"idle" | "playing" | "cpu_thinking" | "restarting">("idle");
let currentTurn = ref(0);
let whoStartedFirst = ref<"player1" | "player2" | "computer">("player1");
let player1Stats = ref({ name: "Player 1", score: 0 });
let player2Stats = ref({ name: "Player 2", score: 0 });
let computerStats = ref({ name: "Computer", score: 0 });
let computersLevel = ref<ComputerDifficulty>("medium");
let boardState = reactive<BoardState>([
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
let winner = ref<"player1" | "player2" | "computer" | null>(null);

export const getBoardState = computed(() => {
  return boardState;
});

export const getGameState = computed(() => {
  return gameState.value;
});

export const getWinner = computed(() => {
  return winner;
});

export const getCurrentPlayerTurn = computed(() => {
  if (location.pathname === "/pvc") {
    return currentTurn.value % 2 === 0 ? "player1" : "computer";
  }
  return currentTurn.value % 2 === 0 ? "player1" : "player2";
});

export const getCurrentPlayerName = computed(() => {
  if (location.pathname === "/pvc") {
    return currentTurn.value % 2 === 0 ? player1Stats.value.name : "Computer";
  }
  return currentTurn.value % 2 === 0 ? player1Stats.value.name : player2Stats.value.name;
});

export function getPlayersName() {
  return {
    player1: computed(() => player1Stats.value.name),
    player2: computed(() => player2Stats.value.name),
  };
}

export function getScores() {
  return {
    player1: computed(() => player1Stats.value.score),
    player2: computed(() => player2Stats.value.score),
    computer: computed(() => computerStats.value.score),
  };
}

export const getComputersLevel = computed(() => {
  return computersLevel;
});

export function playerAction() {
  return {
    placeMark: (index: number) => {
      console.log("executing", index);
      if (boardState[index] === undefined || gameState.value === "restarting") {
        return { blocked: true };
      }

      const currentPlayerTurn = getCurrentPlayerTurn.value;

      if (boardState[index].cell !== "empty") {
        return { blocked: true };
      }

      if (gameState.value === "idle") {
        gameState.value = "playing";
      }

      for (let i = 0; i < NRO_CELLS; i++) {
        if (i === index) {
          continue;
        }

        const cell = boardState[i];

        if (cell === undefined) continue;

        if (cell.cell === "dead") {
          cell.cell = "empty";
          cell.life = MARK_LIFE;
        }

        if (cell.cell === "mark" && cell.player === currentPlayerTurn && cell.life !== 0) {
          cell.life -= 1;
        } else if (cell.cell === "mark" && cell.player === currentPlayerTurn && cell.life === 0) {
          cell.cell = "dead";
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
          player1Stats.value.score += 1;
          winner.value = "player1";
          console.log(
            "%cPLAYER 1",
            "padding: 0.1rem 0.5rem; border-radius: 0.5rem; background: oklch(68.5% 0.169 237.323); color: #fff;",
            player1Stats.value.score,
          );
          break;
        case "player2":
          player2Stats.value.score += 1;
          winner.value = "player2";
          console.log(
            "%cPLAYER 2",
            "padding: 0.1rem 0.5rem; border-radius: 0.5rem; background: oklch(64.5% 0.246 16.439); color: #fff;",
            player2Stats.value.score,
          );
          break;
        case "computer":
          computerStats.value.score += 1;
          winner.value = "computer";
          console.log(
            "%cCOMPUTER",
            "padding: 0.1rem 0.5rem; border-radius: 0.5rem; background: oklch(64.5% 0.246 16.439); color: #fff;",
            player2Stats.value.score,
          );
          break;
      }

      restartingGameAfterTheWinner();
      return { blocked: false };
    },
    quickRestart: () => {
      if (gameState.value === "restarting") {
        cancelRestartingTimeout();
        // TODO: Cancel a future animation
        // cancelWinningAnimation();
      }
    },
    editName: (newName: string, player: "player1" | "player2") => {
      if (player === "player1") {
        player1Stats.value.name = newName;
      } else if (player === "player2") {
        player2Stats.value.name = newName;
      }
    },
    changeComputerDifficulty: (difficulty: ComputerDifficulty) => {
      if (difficulty !== "easy" && difficulty !== "medium" && difficulty !== "hard") {
        computersLevel.value = "medium";
      } else {
        computersLevel.value = difficulty;
      }
    },
    clearGame: () => {
      clearBoard();
      player1Stats.value.score = 0;
      player2Stats.value.score = 0;
      computerStats.value.score = 0;
      restartTurn();
    },
  };
}

export function updateGameStateOnComputerTurn() {
  return {
    computerStartTurn: () => (gameState.value = "cpu_thinking"),
    computerEndTurn: () => {
      if (lookForAWinner()) {
        gameState.value = "restarting";
      } else {
        gameState.value = "playing";
      }
    },
  };
}

function nextTurn() {
  currentTurn.value += 1;
}

function lookForAWinner() {
  const playerBoard: number[] = [];

  for (let i = 0; i < NRO_CELLS; i++) {
    const bs = boardState[i];
    if (bs && bs.player === getCurrentPlayerTurn.value && bs.cell === "mark") {
      playerBoard.push(i);
    }
  }

  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const oneWinScene = WINNING_COMBINATIONS[i];
    if (oneWinScene && oneWinScene.every((value) => playerBoard.includes(value))) {
      return true;
    }
  }
  return false;
}

let timeoutId: number;

function restartingGameAfterTheWinner() {
  gameState.value = "restarting";
  timeoutId = setTimeout(() => {
    clearBoard();
  }, TIMER_AFTER_WIN);
}

function cancelRestartingTimeout() {
  clearTimeout(timeoutId);
  clearBoard();
}

function clearBoard() {
  boardState[0] = { cell: "empty", player: null, life: MARK_LIFE };
  boardState[1] = { cell: "empty", player: null, life: MARK_LIFE };
  boardState[2] = { cell: "empty", player: null, life: MARK_LIFE };
  boardState[3] = { cell: "empty", player: null, life: MARK_LIFE };
  boardState[4] = { cell: "empty", player: null, life: MARK_LIFE };
  boardState[5] = { cell: "empty", player: null, life: MARK_LIFE };
  boardState[6] = { cell: "empty", player: null, life: MARK_LIFE };
  boardState[7] = { cell: "empty", player: null, life: MARK_LIFE };
  boardState[8] = { cell: "empty", player: null, life: MARK_LIFE };
  restartTurn();
  winner.value = null;
  gameState.value = "idle";
}

function restartTurn() {
  if (whoStartedFirst.value === "player1") {
    currentTurn.value = 1;

    whoStartedFirst.value = location.pathname === "/pvc" ? "computer" : "player2";
  } else {
    currentTurn.value = 0;
    whoStartedFirst.value = "player1";
  }
}
