import { setInputListener } from "./js/input.js";

const cells = document.querySelectorAll("td");

const STATES = { played: 0, dead: 1, empty: 2 };
const gameState = {
  gamesPlayed: 0,
  turn: 1,
  whoPlaysFirst: 0,
  currentPlayerTurn: 0,
  players: [
    { id: 0, name: "Player 1", type: "Human" },
    { id: 1, name: "Player 2", type: "Human" },
  ],
  winner: null,
};
const cellsState = [
  { value: null, state: STATES.empty },
  { value: null, state: STATES.empty },
  { value: null, state: STATES.empty },
  { value: null, state: STATES.empty },
  { value: null, state: STATES.empty },
  { value: null, state: STATES.empty },
  { value: null, state: STATES.empty },
  { value: null, state: STATES.empty },
  { value: null, state: STATES.empty },
];
const winScenarios = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Main diagonal
  [2, 4, 6], // Anti diagonal
];

function runTurn(cellIndex) {
  if (cellsState[cellIndex].value === null) {
    console.log(`cell i: ${cellIndex} - player: ${gameState.players[gameState.currentPlayerTurn].name}`);
    const symbol = gameState.currentPlayerTurn === 0 ? "O" : "X";
    cells[cellIndex].innerText = `[${symbol}]`;
    cellsState[cellIndex].value = gameState.currentPlayerTurn;
    cellsState[cellIndex].state = STATES.played;

    // End of the turn - Switch Turn
    gameState.currentPlayerTurn = gameState.currentPlayerTurn === 0 ? 1 : 0;
    gameState.turn++;
  }
  console.log(JSON.stringify(gameState, null, 2));
}

pickWhoPlayFirstTurn();
setInputListener(cells, runTurn);
renderCells();

console.log(JSON.stringify(gameState, null, 2));

function pickWhoPlayFirstTurn() {
  if (gameState.gamesPlayed === 0) {
    gameState.whoPlaysFirst = Math.floor(Math.random() * 2);
    gameState.currentPlayerTurn = gameState.whoPlaysFirst;
    return;
  }

  gameState.whoPlaysFirst = gameState.whoPlaysFirst === 1 ? 0 : 1;
  gameState.currentPlayerTurn = gameState.whoPlaysFirst;
}

function evaluateWhoWins() {
  // Compute if there is a winner after the play.
}

function renderCells() {
  for (let i = 0; i < 9; i++) {
    console.log(cells[i].textContent);
  }
}
