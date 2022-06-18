export default function play() {
	const name = "pedro";
	const age = 25;
	function logPersonInfo(personName: string, personAge: number) {
		const info = `${personName} is ${personAge} years old.`;
		console.log(info);
		return info;
	}

	logPersonInfo(name, age);

	// type "object" is equivalent to { [key: string]: any }, { [key: string]: string | number | boolean | object}
	function printInfo(anyobject: { [key: string]: any }) {
		console.log(anyobject);
	}
	printInfo({ name: "pedro" });

	//unknown type, if i use any i ll get an error, have to use unknown
	function printInfo2(anyobject: { [key: string]: unknown }) {
		if (typeof anyobject.age === "string") anyobject.age.toUpperCase();
	}
	printInfo2({ name: "pedro", age: 25 });

	// void type, functions that does not return anything
	type NoOperation = () => void;
	type Noop = () => any;
	function fn1(x: Noop): void {
		const result = x();
		return result();
	}
	function fn2(x: NoOperation): void {
		const result = x();
		// return result(); i cannot do this because NO OPERATION return type is void
	}
}

// class with generics types, convention use <T>
class Logger<T> {
	public log(items: Array<T>, callback: (item: T) => void) {
		items.forEach((item) => {
			callback(item);
		});
	}
}

export function play2() {
	// when i make an instance of class Logger i can specify now generic type T as string
	const logger = new Logger<string>();
	const names = ["pedro", "juan", "maria"];
	logger.log(names, (name) => {
		console.log(name.toUpperCase());
	});

	// now can i make another Logger instance specifying generic type T as number
	const logger2 = new Logger<number>();
	const numbers = [1, 2, 3, 4];
	logger2.log(numbers, (number) => {
		console.log(number * 2);
	});
}

// generics with extends keywords, extends is used to make a class or interface that can be used with any type
interface Person {
	name: string;
	city?: string;
}
class Student implements Person {
	name: string = "";
	city: string = "";
}
// default values in generics extends class, the default values also has to extends the inital extening interface/type
// now i can make instances of Logger without passing a type for T
class Logger2<T extends Person = Person> {
	public log(items: Array<T>, callback: (item: T) => void) {
		items.forEach((item) => {
			callback(item);
		});
	}
}
interface Car {
	brand: string;
	speedMax: number;
}

export function play3() {
	const logger: Logger2<Person> = new Logger2();
	const persons = [{ name: "pedro" }, { name: "juan" }, { name: "maria" }];
	logger.log(persons, (person) => {
		console.log(person.name.toUpperCase());
	});
}

//generics types with extends
interface Person2 {
	name: string;
}
interface Student2 extends Person2 {
	age: number;
}
type StudentInfo<T extends Student2 = Student2> = {
	data: T;
	grades: number[];
};
export function play4() {
	function logStudentInfo(studentInfo: StudentInfo) {
		console.log(studentInfo.data.name);
		console.log(studentInfo.data.age);
	}
	const studentInfo: StudentInfo = {
		data: {
			name: "pedro",
			age: 25,
		},
		grades: [1, 2, 3, 4],
	};
	logStudentInfo(studentInfo);
}

//infer return type in promises

export async function play5() {
	type Greeting = { message: string };
	const getHelloProps = async function () {
		const greeting: Greeting = { message: "hello there" };

		return {
			props: {
				greeting,
				data: { cars: ["car1", "car2"] },
			},
		};
	};

	type InferHelloProps<T> = T extends () => Promise<{ props: infer Props }> ? Props : never;
	// typeof getHelloProps: () => Promise<{ props: { greeting: Greeting; data: { cars: string[] } } }>

	function sayHello(props: InferHelloProps<typeof getHelloProps>) {
		console.log(props.greeting.message);
		console.log(props.data.cars);
	}
	const { props } = await getHelloProps();
	sayHello(props);
}
