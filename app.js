const resetBtn = document.querySelector(".reset");
const screen = document.querySelector(".screen span");
const signConverter = document.querySelector("#sign-converter");
const dot = document.querySelector(".dot");
const operators = document.querySelectorAll(".operators");
const numbers = document.querySelectorAll(".numbers");
const result = document.querySelectorAll(".result");

let aNum = "";
let operator = "";
let bNum = "";
let calcResult = "";
let haveOperator = false;

function handleDotBtn(event) {
    const dotSign = event.target.innerText;

    if(!haveOperator) {
        if(aNum.indexOf(".") === -1 && aNum.length > 0) {
            aNum += dotSign;
            screen.innerText = numberWithCommas(aNum);
        } 
    } else {
        if(bNum.indexOf(".") === -1 && bNum.length > 0) {
            bNum += dotSign;
            screen.innerText = numberWithCommas(bNum);
        } 
    }
}

function handleResetBtn() {
    aNum = "";
    bNum = "";
    operator = "";
    calcResult = "";
    haveOperator = false;
    screen.innerText = "0";
}

function convertNumberSign() {
    const num = String(screen.innerText);

    if(num === "0") {
        return;
    }

    if(!haveOperator) {
        if(aNum.startsWith("-")) {
            aNum = aNum.substring(1, num.length);
        } else {
            aNum = `-${aNum}`;
        }

        screen.innerText = numberWithCommas(aNum);
    } else {
        if(bNum.startsWith("-")) {
            bNum = bNum.substring(1, bNum.length);
        } else {
            bNum = `-${bNum}`;
        }

            screen.innerText = numberWithCommas(bNum);
    }
}

function enterNumber(event) {
    const inputNum = String(event.target.innerText);

    if(screen.innerText === "0" && inputNum === "0") {
        aNum = "0";
        return;
    }
    
    if(!haveOperator) {
        aNum += inputNum;
        screen.innerText = numberWithCommas(aNum);
    } else {
        bNum += inputNum;
        screen.innerText = numberWithCommas(bNum);
    }
}

//컴마 정규식
function numberWithCommas(num) {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function handleClickOperator(event) {
    operator = String(event.target.innerText);

    haveOperator = true;
}

function showCalcResult() {
    let a = Number(aNum);
    let b = Number(bNum);

    if(haveOperator && b.length != 0) {
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

        aNum = calcResult;
        bNum = "";
        haveOperator = false;
    }

}

dot.addEventListener("click", handleDotBtn);
result.forEach((sign) => {
    sign.addEventListener("click", showCalcResult);
})
operators.forEach((operator) => {
    operator.addEventListener("click", handleClickOperator);
})
numbers.forEach((number) => {
    number.addEventListener("click", enterNumber);
});
signConverter.addEventListener("click", convertNumberSign);
resetBtn.addEventListener("click", handleResetBtn);