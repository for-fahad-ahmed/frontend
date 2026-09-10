const calculator = document.querySelector('.calculator');
const buttons = document.querySelector('.buttons');
const output = document.querySelector('.output');
const inputvalue = document.querySelector('.userinput');
const result = document.querySelector('.result');


function evaluate(string) {
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const operators = ['/', 'x', '-', '+'];

    let expression = 0;
    let temp = null;
    let currentNumber = "";

    for (const chr of string) {
        if (numbers.includes(chr)) {
            currentNumber += chr;
        }

        else if (operators.includes(chr)) {
            const number = Number(currentNumber);

            if (temp === '+') expression += number;
            else if (temp === '-') expression -= number;
            else if (temp === 'x') expression *= number;
            else if (temp === '/') expression /= number;
            else expression = number;

            temp = chr;
            currentNumber = "";
        }
    }

    const number = Number(currentNumber);

    if (temp === '+') expression += number;
    else if (temp === '-') expression -= number;
    else if (temp === 'x') expression *= number;
    else if (temp === '/') expression /= number;
    else expression = number;

    return expression;
}


function handleClick(event) {
    const btn = event.target.closest('button');

    if (!btn)
        return;

    const value = btn.dataset.value;

    if (value === "=") {
        result.textContent = evaluate(inputvalue.textContent);
    }

    else if (value === "c") {
        inputvalue.textContent = "";
        result.textContent = "";
    }

    else {
        inputvalue.textContent += value;

    }


}

calculator.addEventListener('click', handleClick);
calculator.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        result.textContent = evaluate(inputvalue.textContent);
    }
})
