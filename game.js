let operandCount = 2;

function result_changed() {
    let resultBox = document.getElementById("result");
    let result = resultBox.value;
    // let operands = [];
    // for (let i = 0; i < operandCount; i++) {
    //     let id = "term-" + (i + 1);
    //     operands.push(ope);
    // }
    let expectedResult = app.operands[0] + app.operands[1];
    if (expectedResult == result) {
        resultBox.style.opacity = 0;
        resultBox.style.transition = "opacity 0.35s";

        //make a new problem
        makeNewProblem();
        //add coins
        app.coins += getReward();
    }
    else {
        resultBox.style.opacity = 1;
    }
}

Math.logBase = (function() {
    var log = Math.log;
    return function(n, base) {
      return log(n)/(base ? log(base) : 1);
    };
  })();

function getDifficulty(n){
    return Math.logBase(n, app.difficulty);
}

function lower_difficulty(){
    if(app.diamonds < app.difficultyUpgradeCost)
        return;
    app.difficultyUpgradeCost = incrementWithScale(app.difficultyUpgradeCost,  1.06);
    app.difficulty = app.difficulty * 0.95;
    app.reward = getReward();
}

function rand(max) {
    return Math.ceil(Math.random() * max);
}

function getReward(){
    return Math.ceil(getDifficulty(app.operands[0]) + getDifficulty(app.operands[1]));
}

function makeNewProblem() {
    app.operands[0] = rand(app.maxA);
    app.operands[1] = rand(app.maxA);
    app.reward = getReward();
}

function buy_machine_1() {
    //check for cost
    //TODO scale machine cost
    if (app.coins < app.machineCost[0])
        return;
    
    app.coins -= app.machineCost[0];
    app.machineCost[0] = incrementWithScale(app.machineCost[0], 1.09);
    app.machinesOwned[0]++;
}

function increment_base(n){
    //increment by some sane base, maybe 1.1 and we'll see
    const growthFactor = 1.1; //TODO upgradable
    let newN = n * growthFactor;
    return Math.ceil(newN);
}

function increment_number(n) {
    //TODO scale the cost faster than the number increments, maybe 1.15
    if (n == 1) {
        if(app.diamonds < app.numbersUpgradeCost[0])
            return;
        //increment by some sane base, maybe 1.1
        app.maxA = incrementWithScale(app.maxA, 1.1);
        app.diamonds -= app.numbersUpgradeCost[0];
        app.numbersUpgradeCost[0] = incrementWithScale(app.numbersUpgradeCost[0], 1.15);
    }
    else if (n == 2) {
        if(app.diamonds < app.numbersUpgradeCost[1])
            return;
        //increment by some sane base
        app.maxB = incrementWithScale(app.maxB, 1.1);
        app.diamonds -= app.numbersUpgradeCost[1];
        app.numbersUpgradeCost[1] = incrementWithScale(app.numbersUpgradeCost[1], 1.15);
    }
}

function incrementWithScale(n, scale){
    return Math.ceil(n*scale);
}

function result_transitionend() {
    let resultBox = document.getElementById("result");
    resultBox.value = '';
    resultBox.style.opacity = 1;
    resultBox.style.transition = "opacity 1ms ease 1ms";
}

function machineTick() {
    //TODO tick more often, use floating point for diamonds, but show entire ones
    app.diamonds += app.machinesOwned[0];
}

function init() {
    app.coins = 0;
    makeNewProblem();
}

setTimeout(function () {
    init();
}, 500);

setInterval(() => {
    machineTick();
}, 1000);

var app = new Vue({
    el: '#app',
    data: {
        coins: 0,
        diamonds: 0,
        difficultyUpgradeCost: 20,
        numbersUpgradeCost: [10, 10],
        machinesOwned: [0,0,0],
        difficulty: 10,
        machineCost: [10,0,0],
        maxA: 5,
        maxB: 5,
        operands: [0,0],
        reward: 0
    }
});