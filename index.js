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
  { playerName: "playerOne", symbol: "O" },
  { playerName: "playerTwo", symbol: "X" },
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
    gameturn = (gameturn + 1) % 2;
  playerTurn.textContent = players[gameturn].playerName;
}
