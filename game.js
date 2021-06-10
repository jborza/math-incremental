let operandCount = 2;
let coins = 0;
let maxA = 5;
let maxB = 5;

function result_changed(){
    let result = document.getElementById("result").value;
    for(let i = 0; i < operandCount; i++){
        let operands = [];
        let id = "term-"+(i+1);
        operands.push(document.getElementById(id).value);
    }
    let expectedResult = operands[0] + operands[1];
    if(expectedResult == result){
        //make a new problem
        makeNewProblem();
        //add coins
        coins += 1;
        showCoins();
    }
}

function rand(max){
    return Math.ceil(Math.random() * max);
}

function makeNewProblem(){
    document.getElementById("term-1").value = Math.ceil(Math.random() * maxA);
    document.getElementById("term-2").value = Math.ceil(Math.random() * maxB);
}

function showCoins(){
    document.getElementById("coins").value = coins;
}

function init(){
    coins = 0;
    makeNewProblem();
}

setTimeout(function(){
    init();
}, 500);