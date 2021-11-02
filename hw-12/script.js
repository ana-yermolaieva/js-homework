(() => {
    function Student(name, faculty, marks) {
        this.name = name;
        this.faculty = faculty;
        this.marks = marks;
        this.getAvgMark = function () {
            let sum = 0;
            for (let num of this.marks) {
                sum += num;
            }
            return Math.round(sum/this.marks.length);
        };
        this.getMaxMark = function () {
            return this.marks.reduce(((a, b) => a > b ? a : b));
        };
        this.getMinMark = function () {
            return this.marks.reduce(((a, b) => a > b ? b : a));
        };
        this.getTotal = function () {
            let sum = 0;
            for (let num of this.marks) {
                sum += num;
            }
            return sum;
        };
        this.getInfo = function () {
            return `Name: ${name}, Faculty: ${faculty}, Total mark: ${this.getTotal()}`;
        };
    } 

    const student = new Student('Bob', 'law', [5, 99, 12, -3, 15, 86]);

    console.log(student);
    console.log(student.getAvgMark());
    console.log(student.getMaxMark());
    console.log(student.getMinMark());
    console.log(student.getTotal());
    console.log(student.getInfo());
})();