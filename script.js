const display = document.querySelector(".display");

let currentOperand = "";
let previousOperand = "";
let operation = undefined;

function clear() {
    currentOperand = "";
    previousOperand = "";
    operation = undefined;
}


function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
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
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
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
        default:
            return;
    }
    currentOperand = computation;
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
            case 'C':
                clear();
                break;
            case '=':
                compute();
                break;
            default:
                appendNumber(btnText);
                break;
        }
        updateDisplay();
    });
});