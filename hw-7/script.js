function sortLowHightArray(array) {
    let newarray = [];
    newarray = array.sort((a, b) => a - b);
    return newarray;
}

function sortHightLowArray(array) {
    let newarray = [];
    newarray = array.sort((a, b) => b - a);
    return newarray;
}

function evenArray(array) {
    let newarray = [];
    newarray = array.filter(number => number%2 === 0);
    return newarray;
}

function oddArray(array) {
    let newarray = [];
    newarray = array.filter(number => number%2 !== 0);
    return newarray;
}

function sumArray(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum;
}

function averageArray(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum/array.length;
}

function lowestOfArray(array) {
    return (sortLowHightArray(array))[0];
}

function highestOfArray(array) {
    return (sortLowHightArray(array)[array.length - 1]);
}

function newArray() {
    let string = [];
    let array = [];

    do {
        string = prompt(`Hi, User! Put your number-array (3 elements and more) with space between`);
        array = string.split(` `);

    } while (array.length < 3);

    let separator = prompt(`Put your separator`); 
    let userArray = array.map(array => +array); 

    let operationOption = (`Choose operation:
    1 - sort from low to high;
    2 - display all even / odd; //четный/нечетный
    3 - display sum / average value / low value / high value`);

    function operations() {
        let operation = 0;
        do {
            operation = +(prompt(operationOption))
        } while (
            operation !== operation || operation <= 0 || operation > 4
        );
    
        let result;
    
        switch (operation) {
            case 1:
                result = (`low to hight: ${sortLowHightArray(userArray)} ${separator} hight to low: ${(sortHightLowArray(userArray))}`);
            break;
            case 2: 
                result = (`Even numbers : ${(evenArray(userArray))} ${separator} Odd numbers: ${(oddArray(userArray))}`);
            break;
            case 3: 
                result = (`Sum: ${sumArray(userArray)}  ${separator} Average: ${averageArray(userArray)} ${separator} Low number: ${lowestOfArray(userArray)} ${separator} High number: ${highestOfArray(userArray)}`);
            break;
        };
    
        alert(result);
        console.log(result);
    }

    operations();

    while (confirm(`Do you want to repeat?`)) {
        confirm(`Repeat with new array?`) ? newArray() : operations();
    };
}

newArray();