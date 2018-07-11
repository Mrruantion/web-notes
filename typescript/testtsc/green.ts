// function greeter(person) {
//     return "Hello, " + person;
// }

// let user = "Jane User";

// document.body.innerHTML = greeter(user);

// function greeter(person: string) {
//     return "hello," + person;
// }

// // let user = "Jane User";
// let user = [1,2]
// document.body.innerHTML = greeter(user);

// interface Person {
//     firstName: string;
//     lastName: string;
// }

// function greeter(person: Person) {
//     return "Hello, " + person.firstName + " " + person.lastName;
// }

// let user = { firstName: 'Jame', lastName: 'User' };

// document.body.innerHTML = greeter(user);

// class Student {
//     fullName: string;
//     constructor(public firstName, public middleInitial, public lastName) {
//         this.fullName = firstName + " " + middleInitial + " " + lastName;
//     }
// }

// interface Person {
//     firstName: string;
//     lastName: string;
// }


// function greeter(person: Person) {
//     return "Hello, " + person.firstName + " " + person.lastName;
// }

// let user = new Student("Jane", "M.", ["User"]);

// document.body.innerHTML = greeter(user);

let isDone: boolean = false; //布尔
let decLiteral: number = 6; //数字
let firstname: string = 'bob'; //字符串
let list: number[] = [1, 2, 3];
let lists: Array<number> = [1, 2, 3]; //数组
let x: [string, number]; //元组
enum Color { Red, Green, Blue }; //枚举
let c: Color = Color.Green;
enum Color1 { Red = 1, Green, Blue };
let c1: Color1 = Color1.Green;
enum Color2 { Red = 1, Green = 2, Blue = 4 };
let c2: Color2 = Color2.Green;
enum Color3 { Red = 1, Green, Blue };
let colorName: string = Color3[2];
console.log(colorName)
let notSure: any = 4; //Any
let list2: any[] = [1, '22', 'true'];
list2[1] = 100;

function warnUser(): void {
    alert("This is my warnning message")
}

let unusable: void = undefined;
let u: undefined = undefined;
let n: null = null;

let someValue: any = 'this is somevalue';
let strleng: number = (<string>someValue).length;

let strleng2: number = (someValue as string).length;

function sumMatrix(matrix: number[][]) {
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (let i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }

    return sum;
}

function printLabel(labelledObj: { label: string }) {
    console.log(labelledObj.label)
}
let myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj)

interface SquareConfig { //可选属性
    color?: string,
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: 'white', area: 100 };
    if (config.color) {
        newSquare.color = config.color
    }
    if (config.width) {
        newSquare.area = config.width * config.width
    }
    return newSquare
}
let mySquare = createSquare({ color: "balck" });

interface Point { //只读属性
    readonly x: number,
    readonly y: number
}

let p: Point = { x: 1, y: 2 };
// p.x = 5; //error
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// a = ro; // error!
// a = ro as number[];


class Animal {
    name: string;
}

class Dog extends Animal {
    breed: string;
}

// interface NotOkay {
//     [x: number]: Animal; //error 数字索引类型“Animal”不能赋给字符串索引类型“Dog”。
//     [x: string]: Dog;
// }

// console.dir(Dog)

// interface NumberDictionary {
//     [index: string]: number;
//     length: number;
//     name: string //error 数字索引类型“Animal”不能赋给字符串索引类型“Dog”。
// }

interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ['Alice', "Bob"];
// myArray[2] = "Mallory" //error 数字索引类型“Animal”不能赋给字符串索引类型“Dog”。


//类类型
// interface ClockInterface {
//     currentTime: Date;
// }
// class Clock implements ClockInterface {
//     currentTime: Date;
//     constructor(h: number, m: number) { }
// }

// interface ClockInterface {
//     currentTime: Date;
//     setTime(d: Date);
// }

// class Clock implements ClockInterface {
//     currentTime: Date;
//     setTime(d: Date) {
//         this.currentTime = d;
//     }
//     constructor(h: number, m: number) { }
// }

// interface ClockConstructor {
//     new(hour: number, minute: number): ClockInterface;
// }
// interface ClockInterface {
//     tick();
// }

// function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
//     return new ctor(hour, minute)
// }

// class DigitalClock implements ClockInterface {
//     constructor(h: number, m: number) { }
//     tick() {
//         console.log("beep beep")
//     }
// }

// class Analogclock implements ClockInterface {
//     constructor(h: number, m: number) { }
//     tick() {
//         console.log("tick tick")
//     }
// }

// let digital = createClock(DigitalClock, 12, 17);
// let analog = createClock(Analogclock, 7, 32)


// 继承接口
