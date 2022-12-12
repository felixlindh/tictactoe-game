const playerOneNameInput = document.querySelector("#player1");
const playerTwoNameInput = document.querySelector("#player2");
const gameBoard = document.querySelector(".gameboard");
const enterGameBtn = document.querySelector("button");
const playerTurn = document.querySelector("#playerTurn");
const playerInputContainer = document.querySelector(".players");

<<<<<<< HEAD
gameBoard.style.display = "none";

enterGameBtn.addEventListener("click", () => {
  players[0].playerName = playerOneNameInput.value;
  players[1].playerName = playerTwoNameInput.value;
  gameBoard.style.display = "flex";
  playerTurn.textContent = players[gameturn].playerName;
  playerInputContainer.style.display = "none";
});

const players = [
  { playerName: "playerOne", symbol: "0" },
  { playerName: "playerTwo", symbol: "x" },
=======
players = [
    {playerName: "playerOne",
     symbol: "O"},
     {playerName: "playerTwo",
     symbol: "X"}
>>>>>>> new-styles
];
let gameturn = 0;
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", addSymbols);
});

function addSymbols(event) {
<<<<<<< HEAD
  if (event.target.textContent != "") {
    return;
  }
  event.target.textContent = players[gameturn].symbol;
  gameturn = (gameturn + 1) % 2;
  playerTurn.textContent = players[gameturn].playerName;
}
=======
    if (event.target.innerHTML != "") {
        return;
    }
    event.target.innerHTML = `<p>${players[gameturn].symbol}</p>`;
    gameturn = (gameturn + 1) % 2;
}
>>>>>>> new-styles
