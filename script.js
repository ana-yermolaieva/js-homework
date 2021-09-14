function checkCondition(promptOption) {
    let operand;
    do {
        operand = +(prompt(promptOption));
    } while (operand !== operand || operand < 5 || operand > 20);
    return operand;
}

function arrayFill (value) {
    let array = [];
    for (let i=0; i < value; i++) {
        array[i] = +prompt(`put number №`+ `${i + 1}`);
    }
    console.log(array);
    return array;
}

function bubbleSort(array) {
    let n = array.length;
    for (var i = 0; i < n-1; i++)
        { for (var j = 0; j < n-1-i; j++)
            { if (array[j+1] < array[j])
                { var t = array[j+1]; array[j+1] = array[j]; array[j] = t; }
            }
        }                     
    return array;    
}

let arrayLength = checkCondition(`How many elements do you want?
Put your number from 5 to 20`);

alert(`Your sort array [` + `${bubbleSort(arrayFill(arrayLength))}]`);