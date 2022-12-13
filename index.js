const playerOneNameInput = document.querySelector("#player1");
const playerTwoNameInput = document.querySelector("#player2");
const gameBoard = document.querySelector(".gameboard");
const enterGameBtn = document.querySelector(".start-game-btn");
const playerTurn = document.querySelector("#playerTurn");
const playerInputContainer = document.querySelector(".players");
const playerOneScore = document.querySelector(".player1-score");
const playerTwoScore = document.querySelector(".player2-score");
const scoreboard = document.querySelector(".scoreboard");
const joinGameBtn = document.querySelector(".join-game");
const serverIdInput = document.querySelector("#serverId");
const createRoomBtn = document.querySelector(".create-room");
const serverCode = document.querySelector(".server-code")
const roomContainer = document.querySelector(".room-container")

gameBoard.style.display = "none";
scoreboard.style.display = "none";

enterGameBtn.addEventListener("click", () => {
  startGame();
});

function startGame() {
  players[0].playerName = playerOneNameInput.value;
  players[1].playerName = playerTwoNameInput.value;
  gameBoard.style.display = "flex";
  playerTurn.textContent = players[gameturn].playerName;
  playerInputContainer.style.display = "none";
  scoreboard.style.display = "flex";
  roomContainer.style.display = "none";
  updateDisplay();
}

joinGameBtn.addEventListener("click", () => {
  if (!checkNameInput()){
    return;
  }
  joinRoom(serverIdInput.value, (data) => {
    idValue = data.id;
    onRoomUpdate(idValue, handleRoomUpdate);
    startGame();
    serverCode.innerHTML = `Room: ${serverIdInput.value}`
    myTurn = false;
  });
});

function checkNameInput() {
  if (playerOneNameInput.value == "" || playerTwoNameInput.value == "") {
      serverCode.innerHTML = `Please enter player names`
      return false;
  }
  return true;
}

createRoomBtn.addEventListener("click", () => {
  if (!checkNameInput()){
    return;
  }
  createRoom(handleRoomCreated);
  startGame();
  myTurn = true;
});

const players = [
  { playerName: "playerOne", symbol: "O", score: 0 },
  { playerName: "playerTwo", symbol: "X", score: 0 },
];
let gameturn = 0,
  myTurn = true;
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", addSymbols);
});

function addSymbols(event) {
  if (event.target.innerHTML != "" || !myTurn) {
    return;
  }
  event.target.innerHTML = `<p>${players[gameturn].symbol}</p>`;
  updateRoom(idValue, gameboardToArray());
}
const winArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function checkWinCondition() {
  for (let i = 0; i < winArray.length; i++) {
    const numbers = winArray[i];
    if (
      cards[numbers[0]].innerHTML != "" &&
      cards[numbers[1]].innerHTML != "" &&
      cards[numbers[2]].innerHTML != ""
    ) {
      if (
        cards[numbers[0]].innerHTML == cards[numbers[1]].innerHTML &&
        cards[numbers[1]].innerHTML == cards[numbers[2]].innerHTML
      ) {
        players[gameturn].score++;
        updateDisplay();
        setTimeout(resetGame, 1200);
      }
    }
  }
  if (checkDraw()) {
    setTimeout(resetGame, 1200);
  }
}

function checkDraw() {
  for (let card of cards) {
    if (card.innerHTML == "") {
      return false;
    }
  }

  return true;
}

function updateDisplay() {
  playerOneScore.innerHTML = `${players[0].playerName} score: ${players[0].score}`;
  playerTwoScore.innerHTML = `${players[1].playerName} score: ${players[1].score}`;
}

function gameboardToArray() {
  const board = [];
  for (let card of cards) {
    const p = card.querySelector("p");
    if (p == null) {
      board.push("-");
    } else {
      board.push(p.textContent);
    }
  }
  return board;
}

function resetGame() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].innerHTML = "";
  }
}

let idValue;

function handleRoomCreated(data) {
  onRoomUpdate(data.id, handleRoomUpdate);
  serverCode.innerHTML =  `Send this code to your friend ${data.id}`
  console.log(data);
  idValue = data.id;
}

function handleRoomUpdate(data) {
  console.log(data);
  updateBoardFromData(data.board);
}

function updateBoardFromData(board) {
  for (let i = 0; i < board.length; i++) {
    if (board[i] == "-") {
      cards[i].innerHTML = "";
    } else {
      cards[i].innerHTML = `<p>${board[i]}</p>`;
    }
  }
  checkWinCondition();
  gameturn = (gameturn + 1) % 2;
  myTurn = !myTurn;
  playerTurn.textContent = players[gameturn].playerName;
}
