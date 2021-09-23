Array.prototype.average = function() {
    var sum = 0;
    for (let i = 0; i < this.length; i++) {
        sum += this[i];
    }
    return sum/this.length;
}

function averageArray(array, property) {
    for (let i = 0; i < array.length; i++) {
        array[i].averagemark=(property[i].average()); 
    }
    return array;
}

function addMedianToArray(array, property) {
    let newarray = [];
    let mark = [];
    for (let i = 0; i < array.length; i++) {
        mark = property[i].sort(function(a, b) {
            return a - b;
        });
        newarray.push(array[i].median=(mark[Math.floor((mark.length - 1)/2)] + mark[Math.ceil((mark.length - 1)/2)]) / 2);
    }
    return newarray;
}

function addNewStudent(array, variable) {
    return array.push((variable(1)[0]));
}

function arraySort(array) {
    array.sort((a, b) => b.averagemark - a.averagemark);
}

let studentList = studentsMock.getStudentList(10);
  
let marks = studentList.map(studentList => studentList.marks);

const newAverageArray = averageArray(studentList, marks);
console.log(`Added average mark for students:`);
console.log(newAverageArray);

const badStudents = studentList.filter(studentList => studentList.averagemark < 50);
console.log(`Students with bad marks:`);
console.log(badStudents);

addMedianToArray(studentList, marks);
console.log(`Added median mark for students:`);
console.log(studentList.map(studentList => `|${studentList.name}| has median mark (${studentList.median})`));

addNewStudent(studentList, studentsMock.getStudentList);
console.log(`Added new student ^^:`);
console.log(studentList);

arraySort(studentList);
console.log(`Sort students list:`);
console.log(studentList.map(studentList => `${studentList.name} has average mark ${studentList.averagemark}`));