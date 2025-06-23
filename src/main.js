import { setInputListener } from "./js/input.js";

const cells = document.querySelectorAll(".cell");
const messageEl = document.querySelector("#message");

const STATES = { played: 0, dead: 1, empty: 2 };
const gameState = {
  gamesPlayed: 0,
  playing: false,
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
const player1Values = [];
const player2Values = [];

function runTurn(cellIndex) {
  if (cellsState[cellIndex].state === STATES.empty) {
    gameState.playing = true;

    console.log(`cell i: ${cellIndex} - player: ${gameState.players[gameState.currentPlayerTurn].name}`);

    cellsState[cellIndex].value = gameState.currentPlayerTurn;
    cellsState[cellIndex].state = STATES.played;

    if (gameState.currentPlayerTurn === 0) {
      player1Values.push(cellIndex);
    } else {
      player2Values.push(cellIndex);
    }

    messageEl.innerText = `${gameState.players[gameState.currentPlayerTurn].name} turn`;
    renderCell(cellIndex);
    killOldCell();
    evaluateWhoWins();

    gameState.currentPlayerTurn = gameState.currentPlayerTurn === 0 ? 1 : 0; // Change turn
    gameState.turn++;
  }
  console.log(JSON.stringify(gameState, null, 2));
  console.log(JSON.stringify(cellsState, null, 2));
  console.log("1", player1Values);
  console.log("2", player2Values);
}

pickWhoPlayFirstTurn();
setInputListener(cells, runTurn);

console.log(JSON.stringify(gameState, null, 2));

function pickWhoPlayFirstTurn() {
  if (gameState.gamesPlayed === 0) {
    gameState.whoPlaysFirst = Math.floor(Math.random() * 2);
    gameState.currentPlayerTurn = gameState.whoPlaysFirst;
    gameState.winner = gameState.players[gameState.currentPlayerTurn].name;
    messageEl.innerText = `${gameState.players[gameState.currentPlayerTurn].name} turn`;
    return;
  }

  gameState.whoPlaysFirst = gameState.whoPlaysFirst === 1 ? 0 : 1;
  gameState.currentPlayerTurn = gameState.whoPlaysFirst;
}

function killOldCell() {
  for (let i = 0; i < 9; i++) {
    if (cellsState[i].state === STATES.dead) {
      cellsState[i].value = null;
      cellsState[i].state = STATES.empty;
      cells[i].children[0].remove();
    }
  }

  if (gameState.currentPlayerTurn === 0 && player1Values.length > 3) {
    const deadValue = player1Values.shift();
    console.log(cells[deadValue].children[0]);
    cellsState[deadValue].state = STATES.dead;
    cells[deadValue].children[0].setAttribute("data-dead", "");
  } else if (gameState.currentPlayerTurn === 1 && player2Values.length > 3) {
    const deadValue = player2Values.shift();
    console.log(cells[deadValue].children);
    cellsState[deadValue].state = STATES.dead;
    cells[deadValue].children[0].setAttribute("data-dead", "");
  }
}

function evaluateWhoWins() {
  const playerValues = gameState.currentPlayerTurn === 0 ? player1Values : player2Values;
  const sceneriosLength = winScenarios.length;

  for (let i = 0; i < sceneriosLength; i++) {
    const oneWinScene = winScenarios[i];
    if (oneWinScene.every((value) => playerValues.includes(value))) {
      gameState.playing = false;
      messageEl.innerText = `${gameState.players[gameState.currentPlayerTurn].name} wins!!!`;

      // TODO: Convert to for let i = 0;
      oneWinScene.forEach((value) => {
        cells[value].classList.remove("bg-neutral-300/75");
        if (gameState.currentPlayerTurn === 0) {
          cells[value].classList.add("bg-sky-300/70");
        } else {
          cells[value].classList.add("bg-rose-300/70");
        }
      });
    }
  }
}

function renderCell(index) {
  const svg = gameState.currentPlayerTurn === 0 ? circle() : cross();
  cells[index].insertAdjacentHTML("beforeend", svg);
}

const circle = () => `
  <svg
    class="w-full h-full p-px fill-sky-500 data-[dead]:opacity-40"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 47 47"
  >
    <path
      d="M23.5,0C10.52,0,0,10.52,0,23.5s10.52,23.5,23.5,23.5,23.5-10.52,23.5-23.5S36.48,0,23.5,0ZM23.5,39c-8.56,0-15.5-6.94-15.5-15.5s6.94-15.5,15.5-15.5,15.5,6.94,15.5,15.5-6.94,15.5-15.5,15.5Z"
    />
  </svg>
`;

const cross = () => `
  <svg class="w-full h-full p-px fill-rose-500 data-[dead]:opacity-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.41 38.41">
    <rect x="15.74" y="-6.52" width="6.92" height="51.45" rx="3.46" ry="3.46" transform="translate(19.2 -7.95) rotate(45)" />
    <rect x="15.74" y="-6.52" width="6.92" height="51.45" rx="3.46" ry="3.46" transform="translate(46.36 19.2) rotate(135)" />
  </svg>
`;
