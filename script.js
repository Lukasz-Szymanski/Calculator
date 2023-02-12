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
}

function chooseOperation(operator) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = operator;
    previousOperand = currentOperand;
    currentOperand = '';
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
}

function updateDisplay() {
    if (operation !== undefined) {
        return;
    }
    display.value = currentOperand;
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