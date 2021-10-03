"use strict";
const player1 = {
    result: document.querySelector("#box #player1-result"),
    score: document.querySelector("#box #player1-score .point"),
    cardsBox: document.querySelector("#box #player1-cards"),
    cards: Array.from(document.querySelectorAll("#box #player1-cards .card-item")),
};
const player2 = {
    result: document.querySelector("#box #player2-result"),
    score: document.querySelector("#box #player2-score .point"),
    cardsBox: document.querySelector("#box #player2-cards"),
    cards: Array.from(document.querySelectorAll("#box #player2-cards .card-item")),
};
const rps = ["rock", "paper", "scissors"];
const result = rps[(Math.random() * rps.length) >> 0];
// player1.result.style.backgroundImage = `url(./assets/images/${ result }.png)`;
//setRpsIcon(player2.result, result);
//player1.score.textContent = "5";
// player1.cards[0].style.backgroundImage = `url(./assets/images/${ result }.png)`;
setRpsIcon(player1.cards[0], result);
function setRpsIcon(element, rps) {
    element.style.backgroundImage = `url(./assets/images/card_${rps}.png)`;
}
player1.cardsBox.addEventListener("click", (event) => {
    const index = player1.cards.indexOf(event.target);
    console.log(index);
    setRpsIcon(player1.result, result);
});
//# sourceMappingURL=main.js.map