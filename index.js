const playerOneNameInput = document.querySelector("#player1");
const playerTwoNameInput = document.querySelector("#player2");
const gameBoard = document.querySelector(".gameboard");
const enterGameBtn = document.querySelector(".start-game-btn");
const playerTurn = document.querySelector("#playerTurn");
const playerInputContainer = document.querySelector(".players");
const playerOneScore = document.querySelector(".player1-score");
const playerTwoScore = document.querySelector(".player2-score");
const scoreboard = document.querySelector(".scoreboard");

gameBoard.style.display = "none";
scoreboard.style.display = "none";

enterGameBtn.addEventListener("click", () => {
  players[0].playerName = playerOneNameInput.value;
  players[1].playerName = playerTwoNameInput.value;
  gameBoard.style.display = "flex";
  playerTurn.textContent = players[gameturn].playerName;
  playerInputContainer.style.display = "none";
  scoreboard.style.display = "flex";
  updateDisplay();
});

const players = [
  { playerName: "playerOne", symbol: "O", score: 0 },
  { playerName: "playerTwo", symbol: "X", score: 0 },
];
let gameturn = 0;
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", addSymbols);
});

function addSymbols(event) {
  if (event.target.innerHTML != "") {
    return;
  }
  event.target.innerHTML = `<p>${players[gameturn].symbol}</p>`;
  checkWinCondition();
  gameturn = (gameturn + 1) % 2;
  playerTurn.textContent = players[gameturn].playerName;
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
console.log(cards);

let idValue;

createRoom(handleRoomCreated);

function handleRoomCreated(data) {
  onRoomUpdate(data.id, handleRoomUpdate);
  console.log(data);
  idValue = data.id;
}

function handleRoomUpdate(data) {
  updateBoardFromData(data.board);
}

function updateBoardFromData(board) {
  for (let i = 0; i < board.length; i++) {
    if (board[i] == "-") {
      cards[i].innnerHTML = "";
    } else {
      cards[i].innnerHTML = `<p>${board[i]}</p>`;
    }
  }
}
