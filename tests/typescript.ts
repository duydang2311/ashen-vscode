// ====== Basic Types ======
let num: number = 42;
let str: string = "hello";
let bool: boolean = true;
let tuple: [string, number] = ["age", 30];
let arr: number[] = [1, 2, 3];
let obj: { x: number; y: number } = { x: 10, y: 20 };
let anyVal: any = "anything";
let unknownVal: unknown = "maybe string";

// ====== Type Aliases & Interfaces ======
type StringOrNumber = string | number;
type Nullable<T> = T | null;

interface Person {
  readonly id: number;
  name: string;
  age?: number;
  greet(msg: string): string;
}

const person: Person = {
  id: 1,
  name: "Alice",
  greet: (msg) => `${msg}, I'm ${person.name}`
};

// ====== Enums ======
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}
let favColor: Color = Color.Green;

// ====== Functions ======
function add(a: number, b: number = 0): number {
  return a + b;
}
const multiply = (a: number, b: number): number => a * b;

// Overloads
function format(input: string): string;
function format(input: number): string;
function format(input: string | number): string {
  return input.toString();
}

// ====== Generics ======
function identity<T>(value: T): T {
  return value;
}
const ids: number[] = [1, 2, 3];
const strings = ids.map<number>(identity);

// ====== Classes ======
abstract class Animal {
  abstract speak(): void;
}

class Dog extends Animal implements Person {
  id = 2;
  name = "Doggo";
  greet(msg: string): string {
    return `${msg}, woof!`;
  }
  speak(): void {
    console.log("Woof!");
  }
}
const dog: Person & Animal = new Dog();
dog.speak();

// ====== Namespaces ======
namespace Utils {
  export const PI = 3.14159;
  export function square(n: number): number {
    return n * n;
  }
}
let area = Utils.square(4) * Utils.PI;

// ====== Type Assertions ======
let input = "123";
let len1 = (input as string).length;
let len2 = (<string>input).length;

// ====== Union / Intersection ======
type Success = { ok: true; value: string };
type Failure = { ok: false; error: Error };
type Result = Success | Failure;

function doTask(flag: boolean): Result {
  return flag ? { ok: true, value: "done" } : { ok: false, error: new Error("fail") };
}

// ====== Mapped / Conditional Types ======
type OptionsFlags<T> = {
  [K in keyof T]: boolean;
};
type PersonOptions = OptionsFlags<Person>;

type IsString<T> = T extends string ? true : false;
type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false

// ====== Utility Types ======
type PartialPerson = Partial<Person>;
type RequiredPerson = Required<Person>;
type PickedPerson = Pick<Person, "id" | "name">;

// ====== Async / Await ======
async function fetchData(): Promise<string> {
  return new Promise((res) => setTimeout(() => res("done"), 500));
}

async function main() {
  try {
    const data = await fetchData();
    console.log("Fetched:", data);
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
  } finally {
    console.log("Cleanup");
  }
}
main();

// ====== Decorators (experimental) ======
function logMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args);
    return original.apply(this, args);
  };
}

class Calculator {
  @logMethod
  add(a: number, b: number) {
    return a + b;
  }
}
new Calculator().add(2, 3);

// ====== Symbols / Iterators / Generators ======
const sym = Symbol("id");
const objWithSym = { [sym]: 123 };

function* counter() {
  let i = 0;
  while (i < 3) yield i++;
}
for (let n of counter()) console.log("gen:", n);

// ====== BigInt ======
let big: bigint = 123456789012345678901234567890n;

// ====== Module Exports ======
export { person, Color, add, identity };
