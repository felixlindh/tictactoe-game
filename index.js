
players = [
    {playerName: "playerOne",
     symbol: "0"},
     {playerName: "playerTwo",
     symbol: "x"}
];
gameturn = 0;
cards = document.querySelectorAll(".card")

cards.forEach(card => {
    card.addEventListener("click", addSymbols);
});

function addSymbols(event) {
    if (event.target.textContent != "") {
        return;
    }
    event.target.textContent = players[gameturn].symbol;
    gameturn = (gameturn + 1) % 2;
}