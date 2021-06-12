let operandCount = 2;
let coins = 0;
let diamonds = 0;
let maxA = 5;
let maxB = 5;
let machines_1 = 0;

function result_changed() {
    let resultBox = document.getElementById("result");
    let result = resultBox.value;
    let operands = [];
    for (let i = 0; i < operandCount; i++) {
        let id = "term-" + (i + 1);
        operands.push(Number(document.getElementById(id).value));
    }
    let expectedResult = operands[0] + operands[1];
    if (expectedResult == result) {
        resultBox.style.opacity = 0;
        resultBox.style.transition = "opacity 0.25s";

        //make a new problem
        makeNewProblem();
        //add coins
        coins += 1;
        showCoins();
    }
    else {
        resultBox.style.opacity = 1;
    }
}

function rand(max) {
    return Math.ceil(Math.random() * max);
}

function makeNewProblem() {
    document.getElementById("term-1").value = rand(maxA);
    document.getElementById("term-2").value = rand(maxB);
}

function showCoins() {
    document.getElementById("coins").textContent = coins;
}

function showDiamonds() {
    document.getElementById("diamonds").textContent = diamonds;
}

function buy_machine_1() {
    //check for cost
    if (coins < 10)
        return;
    coins -= 10;
    showCoins();
    machines_1++;
    document.getElementById("machine-1-count").textContent = machines_1;
}

function increment_number(n) {
    if (diamonds < 20)
        return;
    if (n == 1) {
        maxA++;
        diamonds -= 20;
        document.getElementById("number-1-max").textContent = maxA;
    }
    else if (n == 2) {
        maxB++;
        diamonds -= 20;
        document.getElementById("number-2-max").textContent = maxB;
    }
}

function result_transitionend() {
    let resultBox = document.getElementById("result");
    resultBox.value = '';
    resultBox.style.opacity = 1;
    resultBox.style.transition = "opacity 1ms ease 1ms";
}

function machineTick() {
    //TODO 
    diamonds += machines_1;
    showDiamonds();
}

function init() {
    coins = 0;
    makeNewProblem();
}

setTimeout(function () {
    init();
}, 500);

setInterval(() => {
    machineTick();
}, 1000);