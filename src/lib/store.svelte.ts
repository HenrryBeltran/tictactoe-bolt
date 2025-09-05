export type BoardState = {
  cell: "empty" | "mark" | "dead";
  player: "player1" | "player2" | null;
  life: number;
}[];
export type BoardIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const MARK_LIFE = 2;
const NRO_CELLS = 9;
const WINNING_COMBINATIONS = [
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

let currentTurn = $state(0);
let player1Stats = $state({ name: "Player 1", score: 0 });
let player2Stats = $state({ name: "Player 2", score: 0 });
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

export function getBoardState() {
  return boardState;
}

export function currentPlayerTurn() {
  return currentTurn % 2 === 0 ? "player1" : "player2";
}

export function getCurrentPlayerName() {
  if (currentTurn % 2 === 0) {
    return player1Stats.name;
  } else {
    return player2Stats.name;
  }
}

export function playerAction(index: BoardIndex) {
  return {
    placeMark: () => {
      if (boardState[index].cell !== "empty") {
        console.log("No espace");
        console.log(currentPlayerTurn());
        console.log(JSON.stringify(boardState, null, 2));
        return;
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
          boardState[i].player === currentPlayerTurn() &&
          boardState[i].life !== 0
        ) {
          console.log("found", boardState[i]);
          boardState[i].life -= 1;
        } else if (
          boardState[i].cell === "mark" &&
          boardState[i].player === currentPlayerTurn() &&
          boardState[i].life === 0
        ) {
          boardState[i].cell = "dead";
        }
      }

      boardState[index].cell = "mark";
      boardState[index].player = currentPlayerTurn();

      const foundWinner = lookForAWinner();
      if (!foundWinner) nextTurn();

      console.log(currentPlayerTurn());
      console.log(JSON.stringify(boardState, null, 2));
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
    if (c.player === currentPlayerTurn() && c.cell === "mark") {
      playerBoard.push(i);
    }
  }

  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const oneWinScene = WINNING_COMBINATIONS[i];
    if (oneWinScene.every((value) => playerBoard.includes(value))) {
      if (currentPlayerTurn() === "player1") {
        console.log(
          "%c " + getCurrentPlayerName() + " wins!",
          "font-weight: 700; font-size: 4rem; color: oklch(68.5% 0.169 237.323);",
        );
      } else {
        console.log(
          "%c " + getCurrentPlayerName() + " wins!",
          "font-weight: 700; font-size: 4rem; color: oklch(64.5% 0.246 16.439);",
        );
      }
    }
  }
  console.log(playerBoard);
  return false;
}
