let calculatorOn = true;
let prevNumber = '';
let currentNumber = '';
let calculatorSigns = '';
let errorMessage = '';
const display = document.getElementById("display");
const displayTwo = document.getElementById("displayTwo")

function toggleCalculator() {
    calculatorOn = !calculatorOn;
    Clear(); 
    displayTwo.style.display = 'block'
    display.style.display = 'none'
    timeDisplays.style.display = 'block'
    timeDisplay.style.display = 'none'
}

function turnOnCalculator() {
    calculatorOn = true;
    Clear();
    displayTwo.style.display = 'none'
    display.style.display = 'block'
    timeDisplay.style.display = 'block'
    timeDisplays.style.display = 'none'
}

function digit(number) {
    if (!calculatorOn) return;
    currentNumber += number;
    updateDisplay();
}

function appendDecimal() {
    if (!currentNumber.includes('.')) {
        currentNumber += '.';
        updateDisplay();
    }
}

function calculateSquareRoot() {
    const current = parseFloat(currentNumber);

    if (isNaN(current) || current <= 0) {
        // alert('Invalid input for square root');
        display.innerHTML = errorMessage;
        Clear();
        return;
    }

    const squareRootResult = Math.sqrt(current);
    display.value = squareRootResult;
    currentNumber = squareRootResult.toString();
    calculatorSigns = '';
    prevNumber = '';
}

function calculateSquare() {
    const current = parseFloat(currentNumber);

    if (isNaN(current) || current <= 0) {
        // alert('Invalid input for square root');
        display.innerHTML = errorMessage;
        Clear();
        return;
    }
}

function signs(calc) {
    if (currentNumber === '') return;

    display.value = `${prevNumber} ${calculatorSigns} ${currentNumber}`;

    if (prevNumber !== '') calcResult();

    if (calc === 'sqrt') {
        calculateSquareRoot();
    } else {
        calculatorSigns = calc;
        prevNumber = currentNumber;
        currentNumber = '';
    }
}

function calcResult() {
    let totalResult;
    const prev = parseFloat(prevNumber);
    const current = parseFloat(currentNumber);

    if (isNaN(prev) || isNaN(current)) {
        alert('Invalid calculation');
        Clear();
        return;
    }

    switch (calculatorSigns) {
        case '+':
            totalResult = prev + current;
            break;
        case '-':
            totalResult = prev - current;
            break;
        case '×':
            totalResult = prev * current;
            break;
        case '%':
            totalResult = (prev * (current / 100));
            break;
        case '÷':
            if (current == 0) {
                errorMessage = 'Syntax Error';
            } else {
                totalResult = prev / current;
            }
            break;
        default:
            break;
    }

    if (errorMessage) {
        alerts.innerHTML = errorMessage;
        alerts.style.display = 'none';
    } else {
        display.innerHTML = errorMessage;
        alerts.style.display = 'none';
    }

    display.value = totalResult;
    currentNumber = totalResult.toString();
    calculatorSigns = '';
    prevNumber = '';
}

function Clear() {
    if (!calculatorOn) return;
    currentNumber = '';
    prevNumber = '';
    calculatorSigns = '';
    display.value = '';
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

function backspace() {
    currentNumber = currentNumber.slice(0, -1);
    display.value = currentNumber;
    prevNumber = '';
    calculatorSigns = '';
}

function updateDisplay() {
    if (!calculatorOn) return;
    display.value = `${prevNumber} ${calculatorSigns} ${currentNumber}`;
}