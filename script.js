const display = document.querySelector(".display");

let currentOperand = "";
let previousOperand = "";
let operation = undefined;

function clear() {
    currentOperand = "";
    previousOperand = "";
    operation = undefined;
}

function percentage(num) {
    return num / 100;
}


function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (number === '.' && currentOperand === '') {
        currentOperand += '0';
    } 
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function chooseOperation(operator) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = operator;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function compute() {
    let computation;
    const prev = new Number(previousOperand);
    const current = new Number(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        case '%':
            computation = prev * (current / 100);
            break;
        default:
            return;
    }
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = "";
    updateDisplay();
}

function updateDisplay() {
    let displayText = "";
    if (operation !== undefined) {
        displayText += previousOperand + " " + operation;
    }
    displayText += " " + currentOperand;
    display.value = displayText.trim();
}

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", e => {
        const btnText = e.target.innerText;
        switch (btnText) {
            case '+':
            case '-':
            case '*':
            case '/':
                chooseOperation(btnText);
                break;
            case ',':
                appendNumber('.');
                break;
            case 'C':
                clear();
                break;
            case '=':
                compute();
                break;
            case '%':
                currentOperand = percentage(currentOperand);
                updateDisplay();
                break;
            default:
                appendNumber(btnText);
                break;
        }
        updateDisplay();
    });
});