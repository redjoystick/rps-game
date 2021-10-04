// type RPS = "rock" | "paper" | "scissors";

enum RPS {
    Rock, Paper, Scissors,
}
console.log(RPS);
const MAX_RPS = Object.keys(RPS).length / 2;

const player1 = {
    result: document.querySelector("#box #player1-result") as HTMLDivElement,
    score: document.querySelector("#box #player1-score .point") as HTMLDivElement,
    cardsBox: document.querySelector("#box #player1-cards") as HTMLDivElement,
    cards: Array.from(document.querySelectorAll("#box #player1-cards .card-item")) as HTMLDivElement[],
};

const player2 = {
    result: document.querySelector("#box #player2-result") as HTMLDivElement,
    score: document.querySelector("#box #player2-score .point") as HTMLDivElement,
    cardsBox: document.querySelector("#box #player2-cards") as HTMLDivElement,
    cards: Array.from(document.querySelectorAll("#box #player2-cards .card-item")) as HTMLDivElement[],
};

const playerCards = [] as RPS[];
const cpuCards = [] as RPS[];

for (let i = 5 - 1; i >= 0; i--) {
    playerCards[i] = Math.random() * MAX_RPS >> 0;
    setRpsIcon(player1.cards[i], playerCards[i]);

    //TODO 完成 cpuCards 

    //TODO 保底機制: 至少有兩種拳型
}
// const results = new Array(5).fill("").map(() => Math.random() * MAX_RPS >> 0);

function setRpsIcon(element: HTMLDivElement, rps: RPS, hover = false) {
    element.style.backgroundImage = `url(./assets/images/card_${ RPS[rps].toLowerCase() }${ hover ? "_s" : "" }.png)`;
}


player1.cardsBox.addEventListener("mouseover", (event: MouseEvent) => {
    const i = player1.cards.indexOf(event.target as HTMLDivElement);

    if (i >= 0)
        setRpsIcon(player1.cards[i], playerCards[i], true);
});

player1.cardsBox.addEventListener("mouseout", (event: MouseEvent) => {
    //TODO 完成無 hover 狀態，試著解決滑鼠移動過快，造成相關的錯誤問題
    // const i = player1.cards.indexOf(event.target as HTMLDivElement);

    // if (i >= 0)
    //     setRpsIcon(player1.cards[i], playerCards[i], true);
});

player1.cardsBox.addEventListener("click", (event: MouseEvent) => {
    const i = player1.cards.indexOf(event.target as HTMLDivElement);

    if (i >= 0)
        setRpsIcon(player1.result, playerCards[i]);

    //TODO 電腦出拳，AI 要多聰明你決定 ?
    ai()

    //TODO 輸贏判斷
    win()
});

function ai() {

}

function win() {

}
