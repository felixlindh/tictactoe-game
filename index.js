
players = [
    {playerName: "playerOne",
     symbol: "O"},
     {playerName: "playerTwo",
     symbol: "X"}
];
gameturn = 0;
cards = document.querySelectorAll(".card")

cards.forEach(card => {
    card.addEventListener("click", addSymbols);
});

function addSymbols(event) {
    if (event.target.innerHTML != "") {
        return;
    }
    event.target.innerHTML = `<p>${players[gameturn].symbol}</p>`;
    gameturn = (gameturn + 1) % 2;
}