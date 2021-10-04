//fibonacci with recursion

function fibonacci(n) {
    return (n <= 1) ? n : fib(n-1) + fib(n-2);
}

//fibonacci with array and cycle

function fib(n) {
    let array = [1, 1];
    if (n === 1 || n === 2) return 1;
    for (let i = 0; i < n; i++) {
        array.push(array[array.length-1]+array[array.length-2]);
    }
    return array[n-1];
}
