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
    suit:0,
    hp:10,
};

const player2 = {
    result: document.querySelector("#box #player2-result") as HTMLDivElement,
    score: document.querySelector("#box #player2-score .point") as HTMLDivElement,
    cardsBox: document.querySelector("#box #player2-cards") as HTMLDivElement,
    cards: Array.from(document.querySelectorAll("#box #player2-cards .card-item")) as HTMLDivElement[],
    suit:0,
    hp:10,
};

const playerCards = [] as RPS[];
const cpuCards = [] as RPS[];
console.log(playerCards);
console.log(cpuCards);

function deal(){
    for (let i = 5 - 1; i >= 0; i--) {
        playerCards[i] = Math.random() * MAX_RPS >> 0;
        setRpsIcon(player1.cards[i], playerCards[i]);
        
    }
};

function dealcpu(){
    for (let i = 5 - 1; i >= 0; i--) {
        cpuCards[i] = Math.random() * MAX_RPS >> 0;
        setRpsIcon(player2.cards[i], cpuCards[i]);
    }
};

deal();
dealcpu();

//TODO 保底機制: 至少有兩種拳型
//TODO 完成 cpuCards 

// const results = new Array(5).fill("").map(() => Math.random() * MAX_RPS >> 0);

function setRpsIcon(element: HTMLDivElement, rps: RPS, hover = false) {
    element.style.backgroundImage = `url(./assets/images/card_${ RPS[rps].toLowerCase() }${ hover ? "_s" : "" }.png)`;
}

function setHp(element: HTMLDivElement, i:number) {
    element.style.backgroundImage = `url(./assets/images/${i}.png)`;
}

player1.cardsBox.addEventListener("mouseover", (event: MouseEvent) => {
    const i = player1.cards.indexOf(event.target as HTMLDivElement);

    if (i >= 0)
        setRpsIcon(player1.cards[i], playerCards[i], true);
});

player1.cardsBox.addEventListener("mouseout", (event: MouseEvent) => {
    //TODO 完成無 hover 狀態，試著解決滑鼠移動過快，造成相關的錯誤問題
    
    const i = player1.cards.indexOf(event.target as HTMLDivElement);
    
    if (i < 0)
    setRpsIcon(player1.cards[i], playerCards[i], true);
});

player1.cardsBox.addEventListener("click", (event: MouseEvent) => {
    const i = player1.cards.indexOf(event.target as HTMLDivElement);

    if ( i>= 0){ 
        setRpsIcon(player1.result, playerCards[i]); 
        player1.suit = playerCards[i];
        playerCards[i] = Math.random() * MAX_RPS >> 0;
        
    }
    
   
    console.log(playerCards[i]);  

    //TODO 電腦出拳，AI 要多聰明你決定 ?
    ai();
   
    //TODO 輸贏判斷
    win();
    setHp(player1.score,player1.hp);
    setHp(player2.score,player2.hp);
});

function ai() {
    const i = Math.random() * 4 >> 0;
    player2.suit = cpuCards[i];
    setRpsIcon(player2.result, cpuCards[i]);
    cpuCards[i] = Math.random() * MAX_RPS >> 0;
    setRpsIcon(player2.cards[i], cpuCards[i]);
  
};

function win() {
    switch (player1.suit){
        case 0 : 
            if(player2.suit == 0){console.log("平手"+`${player1.hp=player1.hp}`);};
            if(player2.suit == 1){player1.hp=player1.hp-1;console.log("輸"+`${player1.hp}`);};
            if(player2.suit == 2){player2.hp=player2.hp-1;console.log("贏"+`${player1.hp}`);};
            break;
        case 1 :
            if(player2.suit == 0){player2.hp=player2.hp-1;console.log("贏"+`${player1.hp}`);};
            if(player2.suit == 1){console.log("平手"+`${player1.hp}`);};
            if(player2.suit == 2){player1.hp=player1.hp-1;console.log("輸"+`${player1.hp}`);};
            break;
        case 2:
            if(player2.suit == 0){player1.hp=player1.hp-1;console.log("輸"+`${player1.hp}`);};
            if(player2.suit == 1){player2.hp=player2.hp-1;console.log("贏"+`${player1.hp}`);};
            if(player2.suit == 2){console.log("平手"+`${player1.hp}`);};
            break;
    }
//0: 'Rock', 1: 'Paper', 2: 'Scissors'
};
