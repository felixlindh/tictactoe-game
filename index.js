/* Listeners and setting player names */
const players = [
    {playerName: "playerOne",
     symbol: "0"},
     {playerName: "playerTwo",
     symbol: "x"}
] 
let gameturn = 0;
const cards = document.querySelectorAll(".card")

cards.forEach(card => {
    card.addEventListener("click", addSymbols);
});

function addSymbols(event) {
    event.target.textContent = players[gameturn].symbol;
    gameturn = gameturn + 1 % 2;
}