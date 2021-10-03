type RPS = "rock" | "paper" | "scissors";

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

const rps = ["rock", "paper", "scissors"] as RPS[];

const result = rps[(Math.random() * rps.length) >> 0];
// player1.result.style.backgroundImage = `url(./assets/images/${ result }.png)`;
//setRpsIcon(player2.result, result);

//player1.score.textContent = "5";

// player1.cards[0].style.backgroundImage = `url(./assets/images/${ result }.png)`;
setRpsIcon(player1.cards[0], result);


function setRpsIcon(element: HTMLDivElement, rps: RPS) {
    element.style.backgroundImage = `url(./assets/images/card_${ rps }.png)`;
}

player1.cardsBox.addEventListener("click", (event: MouseEvent) => {
    const index = player1.cards.indexOf(event.target as HTMLDivElement);
    console.log(index);
    setRpsIcon(player1.result, result);

});

