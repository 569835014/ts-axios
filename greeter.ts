interface Person {
    firstName: string
    lastName: string

    [propName: string]: any
}

interface Point {
    readonly x: number
    readonly y: number
}

interface searchFunc {
    (source: string, subString: string): boolean
}

interface ClockInterface {
    currentTime: Date

    setTime(d: Date)
}

interface ClockContructor {
    new(hour: number, minute: number)
}

class Clock implements ClockInterface {
    currentTime: Date

    setTime(d: Date) {
        this.currentTime = d;
    }
}

let mySearch: searchFunc = function (source: string, subString: string) {
    return false
}

interface StringArray {
    [index: number]: string
}

let myArray: StringArray = ['Bob', 'Fred']
let p1: Point = {x: 10, y: 20}
let a: number[] = [1, 2, 3, 4, 5]
let ro: ReadonlyArray<number> = a

class User {
    fullName: string
    firstName: string
    lastName: string

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + lastName
    }
}

function greeter(person: User) {
    return 'Hello' + person.firstName + ' ' + person.lastName
}

let user: User = new User('1', '2')
console.info(greeter(user))

enum Color {
    Red,
    Green,
    Blue
}

let colorName: string = Color[2]
let color: number = Color.Green

function error(message: string): never {
    throw new Error(message)
}

let x: [string, number] = ['hello', 10]

interface ClockInterfaces {
    tick()
}

interface ClockConstructor {
    new(hour: number, minute: number): ClockInterfaces
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterfaces {
    return new ctor(hour, minute)
}

class DigitalClock implements ClockInterfaces {
    constructor(h: number, m: number) {
    }

    tick() {
        console.info('beep beep')
    }
}

class AnalogClock implements ClockInterfaces {
    constructor(h: number, m: number) {
    }

    tick() {
        console.info('tick toc')
    }
}

interface Shape {
    color: string
}

interface Square extends Shape {
    sideLength: number
}

class Grid {
    static origin = {x: 0, y: 0}
    scale: number

    constructor(scale: number) {
        this.scale = scale
    }

    claculateDistanceFromOrigin(point: { x: number, y: number }) {
        let xDist = point.x - Grid.origin.x;
        let yDist = point.y - Grid.origin.y;
        return Math.sqrt(xDist * xDist + yDist * yDist) * this.scale
    }
}

abstract class Department {
    name: string

    constructor(name: string) {
        this.name = name
    }

    printName(): void {
        console.info('D name' + this.name)
    }

    abstract printMeeting(): void
}

class AccountingDepartment extends Department {
    constructor() {
        super('Accounting ad Auditing')
    }

    printMeeting(): void {
        console.info('The Accounting Department meets each Monday at 10am')
    }
}

function identity<T>(arg: T): T {
    return arg
}

function loggingIdentity<T>(arg: T[]): T[] {
    console.info(arg.length)
    return arg
}

let myIdentity: <T>(arg: T) => T = identity

let output = identity<string>('myString')

function getProps<T, K extends keyof T>(obj: T, prop: K) {
    return obj[prop]
}

function create<T>(c: { new(): T }): T {
    return new c();

}

class LionKeeper {
    nametaag: string
}

class Animal {
    numLengs: number
}

function extend<T, U>(first: T, second: U): T & U {
    let result = {} as T & U;
    for (let id in first) {
        result[id] = first[id] as any
    }
    for (let id in second) {
        if (!result.hasOwnProperty('id')) {
            result[id] = second[id]  as any
        }
    }
    return result
}