function addOperation(first, second) {
    return `Operation "add" finished with result ` + (first + second);
}

function subOperation(first, second) {
    return `Operation "sub" finished with result ` + (first - second);
}

function multOperation(first, second) {
    return `Operation "mult" finished with result ` + (first * second);
}

function divOperation(first, second) {
    return `Operation "div" finished with result ` + (first / second);
}

function sinOperation(first) {
    return `Operation "sin" finished with result ` + (Math.sin(first));;
}

function checkNum(promptOption) {
    let operand;
    do {
        operand = +(prompt(promptOption));
    } while (operand !== operand);
    return operand;
}

function operationHistory(history) {
    for (let i = 0; i < history.length; i++) {
        console.log(history[i]);
    }
}

function calculator() {
    const history = [];

    const option = `Please, choose the operation:
    addition - enter 1
    subtraction - enter 2
    multiplication - enter 3
    division - enter 4
    sin - enter 5
    history - enter 6`;

    let operation;
    do {
        do {
            operation = +(prompt(option));
        } while (operation !== operation || operation === 0 || operation < 0 || operation > 6
        );

        if (operation === 6) {
            operationHistory(history);
            continue;
        }

        const firstNumber = checkNum(`Enter the ${operation < 5 ? 'first number' : 'radiant'}`);
        
        let secondNumber;

        if (operation < 5) {
            secondNumber = checkNum('Enter the second number');
        }

        let result = 0;

        switch (operation) {
            case 1: {
                alert(result = addOperation(firstNumber, secondNumber));
            }
            break;
            case 2: {
                alert(result = subOperation(firstNumber, secondNumber));
            }
            break;
            case 3: {
                alert(result = multOperation(firstNumber, secondNumber));
            }
            break;
            case 4: {
                alert(result = divOperation(firstNumber, secondNumber));
            }
            break;    
            case 5: {
                alert(result = sinOperation(firstNumber));
            }
            break;    
            case 6: {
                operationHistory(history);  
            }
            break;
        };

        history[history.length] = result;

    } while (confirm('Would you like to do another operation?'));

    operationHistory(history);
}

calculator();