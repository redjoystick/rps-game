"use strict";
const NUM_CARDS = 5;
// type RPS = "rock" | "paper" | "scissors";
var RPS;
(function (RPS) {
    RPS[RPS["Rock"] = 0] = "Rock";
    RPS[RPS["Paper"] = 1] = "Paper";
    RPS[RPS["Scissors"] = 2] = "Scissors";
})(RPS || (RPS = {}));
const MAX_RPS = Object.keys(RPS).length / 2;
const player1 = {
    result: document.querySelector("#box #player1-result"),
    score: document.querySelector("#box #player1-score"),
    cardsBox: document.querySelector("#box #player1-cards"),
    cards: Array.from(document.querySelectorAll("#box #player1-cards .card-item")),
    suit: RPS.Rock,
    hp: 10,
};
const player2 = {
    result: document.querySelector("#box #player2-result"),
    score: document.querySelector("#box #player2-score"),
    cardsBox: document.querySelector("#box #player2-cards"),
    cards: Array.from(document.querySelectorAll("#box #player2-cards .card-item")),
    suit: RPS.Rock,
    hp: 10,
};
const playerCards = [];
const cpuCards = [];
function initCards(player, cards) {
    // 初始卡片資料後，用過濾器去重複，其長度作為保低機制
    do {
        // cards = new Array(5).fill("").map(() => Math.random() * MAX_RPS >> 0);
        cards.push(...new Array(5).fill("").map(() => Math.random() * MAX_RPS >> 0));
    } while (cards.filter((v, i) => cards.indexOf(v) === i).length <= 1);
    // 顯示卡片
    cards.forEach((card, i) => setRpsIcon(player[i], card));
}
function setRpsIcon(element, rps, hover = false) {
    element.style.backgroundImage = `url(./assets/images/card_${RPS[rps].toLowerCase()}${hover ? "_s" : ""}.png)`;
}
function setHp(element, i) {
    element.style.backgroundImage = `url(./assets/images/${i}.png)`;
}
// 初始化玩家
initCards(player1.cards, playerCards);
initCards(player2.cards, cpuCards);
setHp(player1.score, player1.hp);
setHp(player2.score, player2.hp);
// 處理玩家的滑鼠反白效果
function initPlayerEvents() {
    player1.cardsBox.addEventListener("mouseover", onMouseOver);
    player1.cardsBox.addEventListener("mouseout", onMouseOut);
    player1.cardsBox.addEventListener("click", onClick);
}
function removePlayerEvents() {
    player1.cardsBox.removeEventListener("mouseover", onMouseOver);
    player1.cardsBox.removeEventListener("mouseout", onMouseOver);
    player1.cardsBox.removeEventListener("click", onClick);
}
function onMouseOver(event) {
    const i = player1.cards.indexOf(event.target);
    if (i >= 0)
        setRpsIcon(player1.cards[i], playerCards[i], true);
}
function onMouseOut(event) {
    const i = player1.cards.indexOf(event.target);
    player1.cardsBox.addEventListener("mouseout", (event) => {
        //TODO 完成無 hover 狀態，試著解決滑鼠移動過快，造成相關的錯誤問題
        const i = player1.cards.indexOf(event.target);
        if (i < 0)
            setRpsIcon(player1.cards[i], playerCards[i], true);
    });
    const i = player1.cards.indexOf(event.target);
    if (i >= 0) {
        setRpsIcon(player1.result, playerCards[i]);
        player1.suit = playerCards[i];
        // player1.cards[i].classList.add("invisible");
        // 補一張新的牌
        playerCards[i] = Math.random() * MAX_RPS >> 0;
        setRpsIcon(player1.cards[i], playerCards[i], false);
    }
    //TODO 電腦出拳，AI 要多聰明你決定 ?
    handleAI();
    //TODO 輸贏判斷
    handleResult();
    // setHp(player1.score,player1.hp);
    // setHp(player2.score,player2.hp);
}
initPlayerEvents();
function handleAI() {
    const i = Math.random() * 4 >> 0;
    player2.suit = cpuCards[i];
    setRpsIcon(player2.result, cpuCards[i]);
    cpuCards[i] = Math.random() * MAX_RPS >> 0;
    setRpsIcon(player2.cards[i], cpuCards[i]);
    //TODO 判斷對方的卡牌類型的比例，決定出牌的內容
    // NPC 隨機
    // [石頭、石頭、石頭、剪刀、剪刀]
    // .reduce() / 變數 + for 1 >> 石頭: 3, 剪刀: 2
    // NPC >> 必出布 >> 出石頭
    // .map() / 變數 + for 2 >> 石頭: 0.6, 剪刀: 0.4
    // NPC >> 布: 0.6, 石頭: 0.4
}
;
function handleResult() {
    //TODO 顯示輸贏後，停頓個 1 ~ 2 秒，進入下一局 setTimeout()
    if (player1.suit === player2.suit) {
        console.log("平手");
    }
    else if ((player1.suit === RPS.Rock && player2.suit === RPS.Scissors) ||
        (player1.suit === RPS.Paper && player2.suit === RPS.Rock) ||
        (player1.suit === RPS.Scissors && player2.suit === RPS.Paper)) {
        console.log("玩家 1 贏");
        //TODO 處理生命的顯示 setHp()
    }
    else {
        console.log("輸");
        //TODO 處理生命的顯示 setHp()
    }
}
;
//# sourceMappingURL=main.js.map