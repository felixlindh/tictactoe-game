const playerOneNameInput = document.querySelector("#player1");
const playerTwoNameInput = document.querySelector("#player2");
const gameBoard = document.querySelector(".gameboard");
const enterGameBtn = document.querySelector("button");
const playerTurn = document.querySelector("#playerTurn");
const playerInputContainer = document.querySelector(".players");

gameBoard.style.display = "none";

enterGameBtn.addEventListener("click", () => {
  players[0].playerName = playerOneNameInput.value;
  players[1].playerName = playerTwoNameInput.value;
  gameBoard.style.display = "flex";
  playerTurn.textContent = players[gameturn].playerName;
  playerInputContainer.style.display = "none";
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
  updateRoom(idValue, ["-", "O", "X", "X", "-", "-", "-", "-", "-"]);
  
}
const winArray = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7],[2,5,8],[0,4,8],[2,4,6]];
function checkWinCondition() {
    for (let i = 0; i < winArray.length; i++) {
        const numbers = winArray[i];
        if (cards[numbers[0]].innerHTML != "" && cards[numbers[1]].innerHTML != "" && cards[numbers[2]].innerHTML != "") {
            if (cards[numbers[0]].innerHTML == cards[numbers[1]].innerHTML && cards[numbers[1]].innerHTML == cards[numbers[2]].innerHTML) {
            players[gameturn].score++;
            console.log(players[gameturn].score)
        }
        }
        
    }
}
console.log(cards)

let idValue;

createRoom(handleRoomCreated)

function handleRoomCreated(data) {
    onRoomUpdate(data.id, handleRoomUpdate)
    console.log(data)
    idValue = data.id;
}

function handleRoomUpdate(data) {
    console.log(data)
}

