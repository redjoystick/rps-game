const NUM_CARDS = 5;

enum GameStatus {
    Prepare, Result, Over,
}
let gameStatus = GameStatus.Prepare;

// type RPS = "rock" | "paper" | "scissors";
enum RPS {
    Rock, Paper, Scissors,
}
const MAX_RPS = Object.keys(RPS).length / 2;

enum AIMode {
    Random, Mode2,
}
const aiMode = Math.random() > 0.5 ? AIMode.Random : AIMode.Mode2;

const player1 = {
    result: document.querySelector("#box #player1-result") as HTMLDivElement,
    score: document.querySelector("#box #player1-score") as HTMLDivElement,
    cardsBox: document.querySelector("#box #player1-cards") as HTMLDivElement,
    cards: Array.from(document.querySelectorAll("#box #player1-cards .card-item")) as HTMLDivElement[],
    hp: 3,
    lastCardId: -1,
    lastSuit: RPS.Rock,
};
const player2 = {
    result: document.querySelector("#box #player2-result") as HTMLDivElement,
    score: document.querySelector("#box #player2-score") as HTMLDivElement,
    cardsBox: document.querySelector("#box #player2-cards") as HTMLDivElement,
    cards: Array.from(document.querySelectorAll("#box #player2-cards .card-item")) as HTMLDivElement[],
    hp: 3,
    lastCardId: -1,
    lastSuit: RPS.Rock,
};

const message = document.querySelector("#box #message") as HTMLDivElement;

//TODO 塞進 player1, player2
const playerCards = [] as RPS[];
const cpuCards = [] as RPS[];

function initCards(player: HTMLDivElement[], cards: RPS[]) {
    // 初始卡片資料後，用過濾器去重複，其長度作為保低機制
    do {
        // cards = new Array(5).fill("").map(() => Math.random() * MAX_RPS >> 0);
        cards.push(...new Array(5).fill("").map(() => Math.random() * MAX_RPS >> 0));
    }
    while (cards.filter((v, i) => cards.indexOf(v) === i).length <= 1);

    // 顯示卡片
    cards.forEach((card, i) => setRpsIcon(player[i], card));
}

function setRpsIcon(element: HTMLDivElement, rps: RPS, hover = false) {
    if (!element) return;

    element.style.backgroundImage = `url(./assets/images/card_${ RPS[rps].toLowerCase() }${ hover ? "_s" : "" }.png)`;
}

function clearRpsIcon(element: HTMLDivElement) {
    if (!element) return;

    element.style.backgroundImage = "";
}

function setHp(element: HTMLDivElement, i:number) {
    element.style.backgroundImage = `url(./assets/images/${i}.png)`;
}

// 初始化玩家
initCards(player1.cards, playerCards);
initCards(player2.cards, cpuCards);
setHp(player1.score, player1.hp);
setHp(player2.score, player2.hp);
initPlayerEvents();

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
function onMouseOver(event: MouseEvent) {
    const i = player1.cards.indexOf(event.target as HTMLDivElement);

    if (i >= 0)
        setRpsIcon(player1.cards[i], playerCards[i], true);
}
function onMouseOut(event: MouseEvent) {
    const i = player1.cards.indexOf(event.target as HTMLDivElement);

    if (i >= 0)
        setRpsIcon(player1.cards[i], playerCards[i], false);
}

/** 處理玩家的出牌 */
function onClick(event: MouseEvent) {
    // 顯示出牌的圖示
    const i = player1.lastCardId = player1.cards.indexOf(event.target as HTMLDivElement);

    if (i < 0) return;

    gameStatus = GameStatus.Result;

    // 禁止玩家再出牌
    // player1.cardsBox.classList.add("disabled");
    removePlayerEvents();

    setRpsIcon(player1.result, playerCards[i]);

    player1.lastSuit = playerCards[i];
    player1.cards[i].classList.add("invisible");

    handleAI();

    // 補一張新的牌
    playerCards[i] = Math.random() * MAX_RPS >> 0;
    setRpsIcon(player1.cards[i], playerCards[i], false);

    handleResult();
}

function handleAI() {
    const i = Math.random() * 4 >> 0;
    player2.lastSuit = cpuCards[i];
    setRpsIcon(player2.result, cpuCards[i]);
    cpuCards[i] = Math.random() * MAX_RPS >> 0;
    setRpsIcon(player2.cards[i], cpuCards[i]);

    //TODO 判斷對方的卡牌類型的比例，決定出牌的內容
    if (aiMode === AIMode.Random) {
        //TODO...
    }
    else {

    }

    const statics = playerCards.reduce((p, v) => {
        p[v]++;
        return p;
    }, [0, 0, 0]);
    console.log(statics);

    // const max = Math.max(...playerCards);
    // const maxIndex = playerCards.indexOf(max);
    const maxIndex = statics.reduce((p, v, i) => {
        return statics[p] < v ? i : p;
    }, RPS.Rock) as RPS;
    console.log(maxIndex);
    switch (maxIndex) {
        case RPS.Rock:
            //TODO 電腦方要出布；如果沒有布，就隨機
            break;
        
    }

    // NPC 隨機

    // [石頭、石頭、石頭、剪刀、剪刀]
    // .reduce() / 變數 + for 1 >> 石頭: 3, 剪刀: 2
    // NPC >> 必出布 >> 出石頭
    
    const reduceArr = playerCards.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      });
    if ( reduceArr <= 3 ){
        if ( cpuCards.indexOf(1) == -1 ){
            player2.suit = cpuCards[Math.random() * 4 >> 0];
        }else{
            player2.suit = cpuCards[cpuCards.indexOf(1)];
        };
    }else if( reduceArr > 3 && reduceArr < 6){
        if ( cpuCards.indexOf(2) == -1 ){
            player2.suit = cpuCards[Math.random() * 4 >> 0];
        }else{
            player2.suit = cpuCards[cpuCards.indexOf(2)];
        };
    }
    else {
        if ( cpuCards.indexOf(0) == -1 ){
            player2.suit = cpuCards[Math.random() * 4 >> 0];
        }else{
            player2.suit = cpuCards[cpuCards.indexOf(0)];
        };
    };
    // type RPS = "rock" | "paper" | "scissors";
    
    // .map() / 變數 + for 2 >> 石頭: 0.6, 剪刀: 0.4
    // NPC >> 布: 0.6, 石頭: 0.4
}

/** 處理輸贏 */
function handleResult() {
    if (player1.lastSuit === player2.lastSuit) {
        console.log("平手");
        message.style.backgroundImage = `url(./assets/images/msg_win.png)`;
        message.classList.remove("invisible");
    }
    else if (
        (player1.lastSuit === RPS.Rock && player2.lastSuit === RPS.Scissors) ||
        (player1.lastSuit === RPS.Paper && player2.lastSuit === RPS.Rock) ||
        (player1.lastSuit === RPS.Scissors && player2.lastSuit === RPS.Paper)
    ) {
        console.log("玩家 1 贏");
        player2.hp--;
        setHp(player2.score, player2.hp);

        message.style.backgroundImage = `url(./assets/images/msg_win.png)`;
        message.classList.remove("invisible");
    }
    else {
        console.log("輸");
        player1.hp--;
        setHp(player1.score, player1.hp);

        message.style.backgroundImage = `url(./assets/images/msg_lose.png)`;
        message.classList.remove("invisible");
    }

    // 顯示輸贏後，停頓個 1 ~ 2 秒，進入下一局 setTimeout()
    setTimeout(() => {
        message.classList.add("invisible");

        // 若當其中一方分數為 0 時，表示遊戲結束；否則，繼續遊戲
        if (player1.hp <= 0 || player2.hp <= 0) {
            console.log("game set");
            removePlayerEvents();
            gameStatus = GameStatus.Over;
            if (player1.hp <= 0){
                message.style.backgroundImage = `url(./assets/images/msg_p2w.png)`
                message.classList.remove("invisible");
            }
            else {
                message.style.backgroundImage = `url(./assets/images/msg_p1w.png)`
                message.classList.remove("invisible");
            }

        }
        else {
            //TODO 更改 aiMode ?

            player1.cards[player1.lastCardId].classList.remove("invisible");

            clearRpsIcon(player1.result);
            clearRpsIcon(player2.result);
            initPlayerEvents();

            gameStatus = GameStatus.Prepare;
        }
    }, 1000);
}
