const resetBtn = document.querySelector(".reset");
const screen = document.querySelector(".screen span");
const signConverter = document.querySelector("#sign-converter");
const dot = document.querySelector(".dot");
const operators = document.querySelectorAll(".operators");
const numbers = document.querySelectorAll(".numbers");
const result = document.querySelector(".result");

let aNum = "", haveAnum = false;
let operator = "", haveOperator = false;
let bNum = "", haveBnum = false;
let calcResult = "";

function handleDotBtn() {
    if(!haveOperator) {
        aNum = addDotAndDisplay(aNum);
    } else {
        bNum = addDotAndDisplay(bNum);
    }
}

function addDotAndDisplay(num) {
    if(num.indexOf(".") === -1) {
        if(num.length > 0) {
            num += ".";
            screen.innerText = numberWithCommas(num);
        }
    } 

    return num;
}

function handleResetBtn() {
    aNum = "";
    haveAnum = false;
    bNum = "";
    haveBnum = false;
    operator = "";
    haveOperator = false;
    calcResult = "";
    screen.innerText = "-";
}

function convertNumberSign() {
    const num = String(screen.innerText);

    if(num === "0" || num === "-") {
        return;
    }

    if(!haveOperator) {
        aNum = addSign(aNum);

        screen.innerText = numberWithCommas(aNum);
    } else {
        bNum = addSign(bNum);

        screen.innerText = numberWithCommas(bNum);
    }
}

function addSign(num) {
    if(num.startsWith("-")) {
        return num.substring(1, num.length);
    } else {
        return `-${num}`;
    }
}

function enterNumber(event) {
    const inputNum = event.target.innerText;
    
    if(!haveOperator) {
        aNum = makeNumber(aNum, inputNum);

        if(aNum != "") haveAnum = true;
        
        screen.innerText = numberWithCommas(aNum);
    } else {
        bNum = makeNumber(bNum, inputNum);

        if(bNum != "") haveBnum = true;
        
        screen.innerText = numberWithCommas(bNum);
    }
}

function makeNumber(num, input) {
    num += input;

    if(num.startsWith("0") && num.indexOf(".") === -1) {
        if(input === "0") {
            num = "0";
        } else {
            num = input;
        }
    }

    return num;
}

//컴마 정규식
function numberWithCommas(num) {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function handleClickOperator(event) {
    operator = event.target.innerText;
    
    haveOperator = true;

    doCalc();
}

function handleClickResult() {
    doCalc();

    aNum = "";
    haveOperator = false;
}

function doCalc() {
    let a = Number(aNum);
    let b = Number(bNum);

    if(haveAnum && haveOperator && haveBnum) {
        switch(operator) {
            case "÷" : 
                calcResult = String(a / b);
                break;
    
            case "x" : 
                calcResult = String(a * b);
                break;
    
            case "-" : 
                calcResult = String(a - b);
                break;
    
            case "+" : 
                calcResult = String(a + b);
                break;
    
            case "^" : 
                calcResult = String(a ** b);
                break;
    
            default : 
                return;
        }

        screen.innerText = numberWithCommas(calcResult);
        aNum = screen.innerText;
        bNum = "";
        haveBnum = false;
    }
}

dot.addEventListener("click", handleDotBtn);
result.addEventListener("click", handleClickResult);
operators.forEach((operator) => {
    operator.addEventListener("click", handleClickOperator);
});
signConverter.addEventListener("click", convertNumberSign);
resetBtn.addEventListener("click", handleResetBtn);
numbers.forEach((number) => {
    number.addEventListener("click", enterNumber);
});