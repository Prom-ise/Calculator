let calculatorOn = true;
let currentNumber = '';
let lastResult = ''; // Keep track of the last result
const display = document.getElementById("display");
const displayTwo = document.getElementById("displayTwo");

function toggleCalculator() {
    calculatorOn = !calculatorOn;
    Clear();
    displayTwo.style.display = 'block';
    display.style.display = 'none';
    timeDisplays.style.display = 'block';
    timeDisplay.style.display = 'none';
}

function turnOnCalculator() {
    calculatorOn = true;
    Clear();
    displayTwo.style.display = 'none';
    display.style.display = 'block';
    timeDisplay.style.display = 'block';
    timeDisplays.style.display = 'none';
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
        display.value = 'Syntax Error';
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
    try {
        let expression = display.value.replace(/\^/g, '**').replace(/%/g, '/100').replace(/×/g, '*').replace(/÷/g, '/');
        let result = eval(expression);
        lastResult = result; // Save the result for later use
        display.value = result;
        display.value = new Function('return ' + display.value)();
    } catch (error) {
        display.value = 'Error';
        Clear();
        display.value += lastResult; // Display the last result on error
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
