"use strict";
// type RPS = "rock" | "paper" | "scissors";
var RPS;
(function (RPS) {
    RPS[RPS["Rock"] = 0] = "Rock";
    RPS[RPS["Paper"] = 1] = "Paper";
    RPS[RPS["Scissors"] = 2] = "Scissors";
})(RPS || (RPS = {}));
console.log(RPS);
const MAX_RPS = Object.keys(RPS).length / 2;
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
const playerCards = [];
const cpuCards = [];
for (let i = 5 - 1; i >= 0; i--) {
    playerCards[i] = Math.random() * MAX_RPS >> 0;
    setRpsIcon(player1.cards[i], playerCards[i]);
    //TODO 完成 cpuCards 
    //TODO 保底機制: 至少有兩種拳型
}
// const results = new Array(5).fill("").map(() => Math.random() * MAX_RPS >> 0);
function setRpsIcon(element, rps, hover = false) {
    element.style.backgroundImage = `url(./assets/images/card_${RPS[rps].toLowerCase()}${hover ? "_s" : ""}.png)`;
}
player1.cardsBox.addEventListener("mouseover", (event) => {
    const i = player1.cards.indexOf(event.target);
    if (i >= 0)
        setRpsIcon(player1.cards[i], playerCards[i], true);
});
player1.cardsBox.addEventListener("mouseout", (event) => {
    //TODO 完成無 hover 狀態，試著解決滑鼠移動過快，造成相關的錯誤問題
    // const i = player1.cards.indexOf(event.target as HTMLDivElement);
    // if (i >= 0)
    //     setRpsIcon(player1.cards[i], playerCards[i], true);
});
player1.cardsBox.addEventListener("click", (event) => {
    const i = player1.cards.indexOf(event.target);
    if (i >= 0)
        setRpsIcon(player1.result, playerCards[i]);
    //TODO 電腦出拳，AI 要多聰明你決定 ?
    ai();
    //TODO 輸贏判斷
    win();
});
function ai() {
}
function win() {
}
//# sourceMappingURL=main.js.map