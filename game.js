let operandCount = 2;
let coins = 0;
let diamonds = 0;
let maxA = 5;
let maxB = 5;
let machines_1 = 0;

function result_changed() {
    let result = document.getElementById("result").value;
    let operands = [];
    for (let i = 0; i < operandCount; i++) {
        let id = "term-" + (i + 1);
        operands.push(Number(document.getElementById(id).value));
    }
    let expectedResult = operands[0] + operands[1];
    if (expectedResult == result) {
        document.getElementById("result").value = '';
        //make a new problem
        makeNewProblem();
        //add coins
        coins += 1;
        showCoins();
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
    //todo showmachines
    document.getElementById("machine-1-count").textContent = machines_1;
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