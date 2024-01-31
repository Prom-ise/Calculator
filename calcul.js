let calculatorOn = true;
let currentNumber = '';
let lastResult = ''; // Keep track of the last result
const display = document.getElementById("display");
const displayTwo = document.getElementById("displayTwo");

function toggleCalculator() {
    calculatorOn = !calculatorOn; //null
    Clear();
    displayTwo.style.display = 'block';
    display.style.display = 'none';
    timeDisplays.style.display = 'block';
    timeDisplay.style.display = 'none';
    erro.style.display = 'none'
}

function turnOnCalculator() {
    calculatorOn = true;
    Clear();
    displayTwo.style.display = 'none';
    display.style.display = 'block';
    timeDisplay.style.display = 'block';
    timeDisplays.style.display = 'none';
}

function shift() {
    let buttons2 = document.getElementById("buttons2");
    let buttons = document.getElementById("buttons");
    let shift = document.getElementById("shift");
    let shifts = document.getElementById("shifts");
    shift.style.display =  'none';
    shifts.style.display =  'block';
    buttons2.style.display = 'grid';
    buttons.style.display = 'none';
}

function shifts() {
    let buttons2 = document.getElementById("buttons2")
    let buttons = document.getElementById("buttons")
    let shifts = document.getElementById("shifts")
    let shift = document.getElementById("shift")
    shift.style.display =  'block'
    shifts.style.display =  'none'
    buttons2.style.display = 'none'
    buttons.style.display = 'grid'
}

function digit(number) {
    if (!calculatorOn) return;
    display.value += number;
}

function backspace() {
    let currentNumber = display.value;
    display.value = currentNumber.slice(0, - 1);
}

function squareRoot() {
    let numberInput = parseFloat(display.value);
    if (numberInput >= 0) {
        display.value = Math.sqrt(numberInput);
    } else {
        Clear();
        erro.style.display = "block"
        setTimeout(() => {
            erro.style.display = 'none'
        }, 2000);
    }
}

function appendAnswer() {
    // If lastResult is not empty, append it to the current display
    if (lastResult !== '') {
        display.value += lastResult;
    }
}

function signs(calc) {
    display.value += calc;
}

function squareOf() {
    display.value += '^';
}

function percentA() {
    display.value += '%';
}

function Clear() {
    display.value = '';
}

function calculate() {
    let erro = document.getElementById("erro");
    try {
        let expression = display.value.replace(/\^/g, '**').replace(/%/g, '/100').replace(/×/g, '*').replace(/÷/g, '/').replace(/(\d+)\(/g, '$1*(').replace(/\)(\d+)/g, ')*$1').replace(/log\(/g, 'Math.log(');

        expression = expression.replace(/sin\(/g, 'Math.sin(');
        expression = expression.replace(/cos\(/g, 'Math.cos(');
        expression = expression.replace(/tan\(/g, 'Math.tan(');

        let result = eval(expression);
        lastResult = result; // Save the result for later use
        display.value = result;
        display.value = new Function('return ' + display.value)();
    } catch (error) {
        display.value = '';
        erro.style.display = "block"
        setTimeout(() => {
            erro.style.display = 'none'
        }, 2000);
        //display.value += lastResult; // Display the last result on error
    }
}

function updateTime() {
    if (!calculatorOn) return;
    var time = new Date().toLocaleTimeString();
    var times = new Date().toLocaleTimeString();
    document.getElementById("timeDisplay").innerHTML = time;
    document.getElementById("timeDisplays").innerHTML = times;
}

updateTime();
setInterval(updateTime, 1000);
