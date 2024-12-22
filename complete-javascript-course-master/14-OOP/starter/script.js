'use strict';

// CONSTRUCTOR FUNCTION - a function used to programatically build objects
// A Constructor function is just like any other function, the only difference is that we call a constructor function using the 'new' operator.

// By convention, constructor functions start with uppercase letter. We are using function expression here, but function declaration also works. We cannot use arrow functions as contructor functions(because they dont have their own 'this' and it is required for constructor functions).

console.log(this); //  {}

const Person = function (firstName, birthYear) {
  // instance properties: will be available as properties on all the instances created from the Person constructor function.
  this.firstName = firstName;
  this.birthYear = birthYear;

  // never create a method inside a constructor function.
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

///////////////////////////////////////////////////////////////
//The 'new' operator does the following when we call a function using it.
//  1. A new empty object is created
//  2. function is called and its 'this' will be set to the newly created object.
//  3. The newly created object is linked to the constructor function's proptoype object. This is done by creating a __proto__ property on the newly created object and its value pointing to the constructor function's proptoype.
//  4. function automatically returns the object (which most likely will have properties)
///////////////////////////////////////////////////////////////

// The 'new' operator does the above and stores the returned object in the variable 'jonas'. Thus we have created an object using a function here, and not created it as an object literal.
const jonas = new Person('Jonas', 1991);
console.log(jonas);

// creating more objects using the constructor function
const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

// Although Person is a function and not a class, we can still say that jonas, matilda and jack are instances of Person since they were created based on the 'blueprint' of Person. We can check if an object is an instance of some constructor using the instanceof operator.

const jay = { name: 'jay' };
console.log(jonas instanceof Person); // true
console.log(jay instanceof Person); // false
console.log(jonas instanceof Object); // true
console.log(jay instanceof Object); // true

typeof new Person('Jonas', 1991); // the type of the returned object is 'Person' because it is created from the Person constructor.

// jonas.calcAge(1991);
///////////////////////////////////////////////////////////
//We should never create methods inside a constructor function because, we would most likely go on to create a lot of objects (instances) from the constructor function and each of those objects would have that method in them, a copy of the method would be inside each one of those objects, which is bad for the performance of our code. We have prototypal inheritance for 'supplying' methods to objects.
//////////////////////////////////////////////////////////

// NOTE: Function constructors are not really a feature of JS, they are just a pattern that has been implemented by developers using the 'new' operator.

// PROTOTYPES
// All functions in JS (including constructor functions) automatically have a property called 'prototype'. The prototype is an object and all the objects that are created through a constructor function will get access to all the properties and methods that we define on the prototype property of the constructor function.

// Here we are defining a method 'calcAge' on the constructor function's prototype property. Person.prototype is actually an object which will store all the properties and methods we define, which will then be inherited by its instances. In other words, Person.prototype is the prototype of all the instances that will be created from the Person constructor.
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
  // return 2037 - this.birthYear;
};
console.log(Person.prototype); // {calcAge: ƒ, constructor: ƒ}
console.log(typeof Person.prototype); // object
// And now the objects created out of the constructor function will get access to the calcAge method, even though the method is not actually in the object. But because of prototypal inheritance, the method defined on the prototype property of Person can be accessed by any instance of Person. Thus we dont have to write methods in the constructor, which as we saw is inefficient. The method is defined only once on the constructor function's prototype object and the objects created from it can use(inherit) it.
// Any object will always have access to methods and properties in its prototype and here the prototype of object 'jonas' is Person.prototype
jonas.calcAge(); // 46
matilda.calcAge(); // 20

// To see what exactly is the prototype of an object, we can look for a special property called __proto__ on that object and it points to its constructor function's prototype property. The __proto__ property on the object is created by the 'new' operator and links it to the prototype property of the constructor function.
console.log(jonas.__proto__); // {calcAge: ƒ, constructor: ƒ}
console.log(jonas.__proto__ === Person.prototype); // true
///////////////////////////////////////////////////////////
//Just to be clear, Person.prototype is not the prototype of Person but its what's going to be used as the prototype of all the objects(instances) that are created with the Person constructor function.
///////////////////////////////////////////////////////////

// We can use the built-in isPrototype to check this:
const jay2 = {};

console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(matilda)); // true
console.log(Person.prototype.isPrototypeOf(jay2)); // false
console.log(Person.prototype.isPrototypeOf(Person)); // false

// We can also set properties on the prototype of the constructor function, which will then be inherited by the objects created. However the properties created on the prototype of the constructor function are not direct properties of the object (like firstName and birthYear in this case) but are inherited from the prototype.
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species); // "Homo Sapiens"
console.log(matilda.species); // "Homo Sapiens"

// We can check if an object's property is its own property or if its inherited from its prototype using the built-in hasOwnProperty method.
console.log(jonas.hasOwnProperty('firstName')); // true
console.log(jonas.hasOwnProperty('species')); // false

// PROTOTYPAL INHERITANCE ON BUILT-IN OBJECTS

// In the above statement, we called the hasOwnMethod on jonas object, but that method is neither available in jonas, nor in its prototype (Person.protoype). The method is actually available in the prototype of jonas's prototype i.e in the prototype of Person.prototype. And that will be Object.prototype where Object is the main constructor from which all objects are created, and it has no prototypes. (its __proto__ will be null).
// Object.prototype will usually be at the top of the prototype chain.
console.log(jonas.__proto__); // Person.prototype
console.dir(jonas.__proto__.__proto__); // Object.prototype
console.log(jonas.__proto__.__proto__ == Person.prototype.__proto__); // true
console.log(jonas.__proto__.__proto__ === Object.prototype); // true
console.log(jonas.__proto__.__proto__.__proto__); // null

console.dir(Person.prototype.constructor); // Person(...)

const arr = [1, 4, 6, 8, 4, 1, 6, 8];

// The prototype of an array, is in the prototype property of the built-in Array constructor and here we can find all the built-in array methods
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); // true
console.log(arr.__proto__.__proto__ === Object.prototype); // true
console.dir(randomArr.__proto__); //Array.prototype
console.dir(randomArr.__proto__.__proto__); //Object.prototype

// creating an array using [] is just a shorthand for creating an array using the new operator
const arr2 = new Array(1, 3, 5, 6); // is same as
const arr3 = [1, 3, 5, 6]; // doing this

// Now that we know that all the array methods are stored in the Array.prototype object, we can use that object and add methods of our own to it. However its not a good practice to do it.
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector('h1');
// console.dir(h1); // check prototype chain
// console.dir((x) => x+1); // check prototype chain

// CODING CHALLENGE #1
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

/*
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} speeded up to ${this.speed}kmph`);
  // return this.speed + 10;
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} slowed down to ${this.speed}kmph`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.brake();

mercedes.brake();
mercedes.accelerate();
*/

/*
// ES6 CLASSES
// There are no classes in JS in the traditional sense, ES6 Classes are just a layer of abstraction (so called syntactic sugar) over the constructor function way of creating objects.

// ES6 Classes are special functions which we use to create objects. They can be written as a class declaration, just like a function declaration. And we also have class expressions just like function expresssions.

// Class declaration.
// Inside each class we make a 'constructor' method, and it works similar to a constructor function, except that it is a method inside the class. It should always be named as 'constructor'. Just like in constructor function we pass the arguments which then become the properties of the instances, in the same way we do it with the constructor method. Then after the constructor method, we can write methods inside the class, which will be stored in the prototype object of the class, and those methods will be inherited by the instances of the class.
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // methods defined outside the constructor will be added to PersonCl.prototype
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`hey ${this.firstName}`);
  }
}

// Class expression
const Person_Cl = class {};

// The objects (instances) created from the class are created using the 'new' operator, just like we create objects using constructor functions.
const jessica = new PersonCl('Jessica', 1996);
console.log(jessica);
jessica.calcAge();

console.log(jessica.__proto__ === PersonCl.prototype); // true

// PersonCl.prototype.greet = function () {
//   console.log(`hey ${this.firstName}`);
// };

jessica.greet();

////////////////////////////////////////////////////////////////
// 1. Classes are NOT hoisted
// 2. Classes are also first class citizens like functions. Which means they can be passed into functions and also returned from functions
// 3. Classes are always executed in strict mode even if we use 'use strict'
////////////////////////////////////////////////////////////////

// SETTERS AND GETTERS
// Every object in JS has special properties called setters and getters, and we call these special properties as assessor properties, while other properties are called data properties.
// As the name suggests, the assessor properties are functions that get and set values.

 

console.log(account.latest); // -300

console.log(account.movements); // [200, 530, 120, -300]
account.latest = 50;
console.log(account.movements); // [200, 530, 120, -300, 50]

// Classes also have getters and setters which work in the exact same way.

class PersonCl2 {
  constructor(_fullName, birthYear) {
    this._fullName = _fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // set a property that already exists
  set _fullName(name) {
    // console.log(name);
    if (name.includes(' ')) this.fullName = name;
    else alert(`${name} is not a full name`);
  }

  get _fullName() {
    return this.fullName;
  }
}

const gautam = new PersonCl2('Gautam Mohite', 1988);

// Instead of calling the calcAge method, we can use the getter by the name 'age', which basically does exactly the same thing as calcAge, but we can read 'age' as a property, which is more convenient.
console.log(gautam.age);
gautam.calcAge();

// const jake = new PersonCl2('Jake', 1965); // will give warning that its not a full name
const jake = new PersonCl2('Jake Peralta', 1965);
console.log(jake.fullName); // 'Jake Peralta'

// Getters and setters are good for doing data validation before storing the data on objects

// STATIC METHODS
// Static Methods are methods that are attached to the constructor itself, and not in the prototype object of the constructor. Hence the instances will not be able to inherit the static methods.
// Static methods are said to be in the namespace of their constructors, i.e they only exist on the constructor (since they do tasks most related to the constructor).
const Person2 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person2.hey = function (firstName) {
  firstName ? console.log(`hey ${firstName} 👋`) : console.log('hey 👋');
  // console.dir(this); // Person2()
};

const amy = new Person2('Amy', 1985);

Person2.hey(); // hey 👋
Person2.hey(amy.firstName); // hey Amy 👋
// amy.hey(); //error, because amy will not inherit the method 'hey' because its a static method.

const x = 1;
const y = [1];

// isArray is a static method of Array constructor
console.log(Array.isArray(x)); // false
console.log(Array.isArray(y)); // true

// 'from' is a static method of Array constructor
const me = Array.from('gautam'); // ['g', 'a', 'u', 't', 'a', 'm']
const h1 = Array.from(document.querySelectorAll('h1'));

// To create a static method inside a class, we use the keyword 'static'

class Person3 {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  static hey(name) {
    name ? console.log(`hey ${name} 👋`) : console.log('hey 👋');
  }
}

const charles = new Person3('Charles', 1975);

Person3.hey();
Person3.hey(charles.firstName);
*/

/*
// Object.create()
// When creating objects with Object.create, we make an object as the prototype 
const PersonProto = {
  calcAge: function () {
    console.log(2037 - this.birthYear);
  },

  info: function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// returns an empty object with with it __proto__ pointing to PersonProto
const steven = Object.create(PersonProto);
console.log(steven.__proto__ === PersonProto); // true
console.log(steven); // {}
// filling in data in the steven object
steven.name = 'Steven';
steven.birthYear = 2002;
console.log(steven); // {name: 'Steven', birthYear: 2002}


// calcAge inherited from PersonProto since the object steven was created with PersonProto as the prototype. Here PersonProto itself is the prototype, not its .prototype property. Infact we didnt even define it here
steven.calcAge(); // 35

const sarah = Object.create(PersonProto);
// filling in data in the sarah object
sarah.info('Sarah', 1970);
sarah.calcAge();
*/

/*
// CODING CHALLENGE #2
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} speeded up to ${this.speed}kmph`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} slowed down to ${this.speed}kmph`);
  }

  get SpeedUS() {
    return `${this.speed / 1.6} mph`;
  }

  set SpeedUS(speed) {
    this.speed = speed * 1.6;
    console.log(`${this.speed} kmph`);
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford.SpeedUS);
ford.accelerate();
ford.brake();
ford.accelerate();
ford.accelerate();
ford.accelerate();
ford.accelerate();
ford.brake();
ford.brake();
ford.brake();

console.log(ford.SpeedUS);

// console.log(ford);
ford.SpeedUS = 50;
// ford.SpeedUS = 120;
console.log(ford.speed);
// console.log(ford);
*/

/*
// INHERITANCE BETWEEN "CLASSES": CONSTRUCTOR FUNCTIONS
// We can set inheritance between two 'classes' where one 'class' becomes the child-class and the other becomes the parent-class. We are using the term 'class' here for the constructor function and its prototype, and as we know, real classes in the traditional OOP sense do not exist in JS.

// Here we are creating a parent class called Person (same as we used before) and a child class called Student. The student can then have methods of its own and also inherit some methods from its parent class - Person.

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
Person.prototype.species = 'Homo Sapiens';

// usually the child class will have additional functionality from the parent class
const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  // the above 2 properties are very much same as that in the Person constructor function, so we can 'import' those two properties here by invoking Person function using the call method and setting the 'this' keyword to Student.
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Now we also want instances of Student to inherit methods from Person class. In order to make that possible we need to set up prototype chain where Student is the child class of Person by manually making the .__proto__ property of Student.prototype point to Person.prototype object, using the Object.create method.
// NOTE: We have to make this connection before we define any methods in Student.prototype because Object.create will return an empty object, so if we do it later, all the previously defined methods will be overwritten.

Student.prototype = Object.create(Person.prototype);
// console.log(Student.prototype.__proto__ === Person.prototype);
//true

// We could also do this but the __proto__property is deprecated and not best practice to use.
// Student.prototype.__proto__ = Person.prototype;

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

// creating an instance of Student
const mike = new Student('Mike', 2002, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();
console.log(mike.species);

console.dir(Student.prototype.constructor); // Person
// The constructor of Student.prototype should be Student itself, not Person. So we need to fix that
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor); // Student

console.log(mike instanceof Student); // true
console.log(mike instanceof Person); // true - because of the inheritance we manually set using Object.create()
console.log(mike instanceof Object); // true
*/

/*
// CODING CHALLENGE #3
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} speeded up to ${this.speed}kmph`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} slowed down to ${this.speed}kmph`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// EV.prototype.__proto__ = Car.prototype;
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  console.log(`${this.make}'s battery charged to ${this.charge}%`);
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}%`
  );
};

EV.prototype.constructor = EV;

const tesla = new EV('Tesla', 120, 23);
// console.log(tesla.__proto__);

// console.dir(EV.prototype.constructor);
console.log(tesla);
tesla.chargeBattery(90);
tesla.brake();
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();

// Notice that the accelerate method of the EV class was used instead of the accelerate method of the Car class. Thats because of Polymorphism, where a child class can overwrite a method it inherited from its parent class. If we look at it from another way, if a method is found in one of the child classes, then it will be used and JS will stop looking up the prototype chain since it already found the method it was looking for.
*/

/*
// INHERITANCE BETWEEN "CLASSES": ES6 CLASSES
class PersonCL {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name.`);
  }

  get fullName() {
    return this._fullName;
  }

  get firstName() {
    return this.fullName.split(' ')[0];
  }

  get lastName() {
    return this.fullName.split(' ')[this.fullName.split(' ').length - 1];
  }
}

// To implement inheritance between ES6 classes, we only need the 'extend' keyword and the 'super' function.

// Here we are creating a new ES6 class StudentCL and making it inherit from PersonCL using the 'extends' keyword. The 'extends' keyword will automatically set inheritance and the prototype chain. Inside the class we then call the 'super' function. 'super is basically the constructor function of the parent class(in this case PersonCL). Calling the 'super' function always needs be the first thing to happen inside a child class because not only will it call the parent class and make the child class inherit its properties, but the 'super' function also sets the 'this' keyword to the current child class. so that we can then define other properties and methods(inside the prototype object) which are unique to the child class.
class StudentCL extends PersonCL {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I am ${this.age} years old but since I'm in college i feel like ${
        this.age + 10
      }`
    );
  }
}

const martha = new StudentCL('Martha Jones', 2012, 'CS');
martha.introduce();
martha.calcAge();
console.log(martha.lastName);
console.log(martha.firstName);
console.log(martha.age);

// If we are not setting any new properties on the child class, then just the 'extends' would be enough. We dont even need a constructor inside the child class. In that case, the super function will be automatically called and the child class will inherit all the parent class's properties.
class Student_CL extends PersonCL {}
const adrian = new Student_CL('Adrian Pimento', 1970);
console.log(adrian.lastName);
*/

//////////////////////////////////////////////////////////
// NOTE: This mechanism of inheritance that we set here can actually be very problematic and dangerous in the real world when designing software, a better approach could be functional programming.
//////////////////////////////////////////////////////////

/*
// INHERITANCE BETWEEN CLASSES: Object.create
const Person_Proto = {
  calcAge: function () {
    console.log(2037 - this.birthYear);
  },

  info: function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steve = Object.create(Person_Proto);

const Student_Proto = Object.create(Person_Proto);

// overrides the info method in Person_Proto (polymorphism)
Student_Proto.info = function (firstName, birthYear, course) {
  Person_Proto.info.call(this, firstName, birthYear);
  this.course = course;
};

Student_Proto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const ray = Object.create(Student_Proto);

ray.info('Ray', 1990, 'Maths');
// ray.course = 'Maths';
console.log(ray);
ray.calcAge();
ray.introduce();

// This way of setting inheritance between one object and another and the Object.create is much simpler. We are not using any constructors here and thereby no .prototype object is involved. Its just simply making one object the prototype of the other and then the other object inherits properties and methods.
*/

/*
// ANOTHER CLASS EXAMPLE
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${this.owner}`);
  }

  // Public interface
  deposit(value) {
    this.movements.push(value);
  }

  withdraw(value) {
    this.deposit(-value);
  }

  approveLoan(value) {
    return true;
  }

  requestLoan(value) {
    this.approveLoan(value) ? this.deposit(value) : alert(`Not approved`);
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

// acc1.movements.push(250);
// acc1.movements.push(-140);

acc1.deposit(250);
acc1.withdraw(140);

acc1.requestLoan(1000);
acc1.approveLoan(1000);

console.log(acc1);
*/

// ENCAPSULATION: Protected Properties and Methods

////////////////////////////////////////////////////////
// We can keep some properties and methods of a class protected so that they cannot be accessed from outside the class. The ones that are not kept protected will be the public interface i.e API.

// Need for encapsulation:
// 1. to prevent code from outside a class to accidentally manipulate data inside the class.
// 2. Only a few properties/methods should be made a part of the public interface, this gives us more confidence to change other internal methods without the risk of getting manipulated by code from outside, since these internal methods will no longer rely on code from outside the class.
////////////////////////////////////////////////////////
class Account_Pvt {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.locale = navigator.language;

    // makes sense to protect these properties
    this._movements = [];
    this.pin = pin;

    console.log(`Thanks for opening an account, ${this.owner}`);
  }

  getMovements() {
    return this._movements;
  }

  deposit(value) {
    this._movements.push(value);
  }

  withdraw(value) {
    this.deposit(-value);
  }

  // makes sense to protect this method
  _approveLoan(value) {
    return true;
  }

  requestLoan(value) {
    this._approveLoan(value) ? this.deposit(value) : alert(`Not approved`);
  }
}

// const acc2 = new Account_Pvt('Gautam', 'INR', 2222);

// acc2._movements.push(1000);
// acc2.deposit(250);
// acc2.withdraw(140);
// acc2.requestLoan(1000);

// console.log(acc2.getMovements());

// PRIVATE CLASS FIELDS AND METHODS
// 1. Public fields
// 2. Private fields
// 3. Public methods
// 4. Private methods

class Account_Pvt2 {
  // Public fields (will be available on the instances as direct properties and can also be referenced inside the class with 'this' keyword). Public fields will not be available in the class's prototype object
  locale = navigator.language;

  // Private fields (cannot be accessed from outside, but can be referenced inside the class with 'this' keyword)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    console.log(`Thanks for opening an account, ${this.owner}`);
  }

  // Public Methods (Public Interface)
  getMovements() {
    return this.#movements;
  }

  deposit(value) {
    this.#movements.push(value);
  }

  withdraw(value) {
    this.deposit(-value);
  }

  requestLoan(value) {
    this.#approveLoan(value) ? this.deposit(value) : alert(`Not approved`);
  }

  // Static public method
  static helper() {
    console.log('Helper');
  }

  // Private methods
  // makes sense to protect this method
  #approveLoan(value) {
    return true;
  }
}

// const acc3 = new Account_Pvt2('Amy', 'USD', 3333);

// acc3._movements.push(1000);
// acc3.deposit(250);
// acc3.withdraw(140);
// acc3.requestLoan(1000);

// cannot access these private properties from outside
// console.log(acc3.#movements); // error
// console.log(acc3.#pin); // error

// console.log(acc3.getMovements());
// console.log(acc3);
// Account_Pvt2.helper();

/*
// CHAINING METHODS
// We can chain object methods just like array methods.
// For it to work, the previous method should return an object

class Account_Pvt3 {
  locale = navigator.language;

  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    console.log(`Thanks for opening an account, ${this.owner}`);
  }

  // Public Methods (Public Interface)
  getMovements() {
    return this.#movements;
  }

  deposit(value) {
    this.#movements.push(value);
    return this;
  }

  withdraw(value) {
    this.deposit(-value);
    return this;
  }

  requestLoan(value) {
    this.#approveLoan(value) ? this.deposit(value) : alert(`Not approved`);
    return this;
  }

  // Static public method
  static helper() {
    console.log('Helper');
  }

  // Private methods
  // makes sense to protect this method
  #approveLoan(value) {
    return true;
  }
}

const acc4 = new Account_Pvt3('Jake', 'USD', 4444);

// acc3._movements.push(1000);
acc4.deposit(250);
acc4.withdraw(140);
acc4.requestLoan(1000);

// cannot access these private properties from outside
// console.log(acc3.#movements); // error
// console.log(acc3.#pin); // error

console.log(acc4.getMovements());
console.log(acc4);
Account_Pvt3.helper();

// For object chaining to work, the previous method should return an object
acc4.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc4.getMovements());
*/

// CODING CHALLENGE #4
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} speeded up to ${this.speed}kmph`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} slowed down to ${this.speed}kmph`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// EV.prototype.__proto__ = Car.prototype;
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  console.log(`${this.make}'s battery charged to ${this.charge}%`);
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}%`
  );
};

EV.prototype.constructor = EV;

const tesla = new EV('Tesla', 120, 23);
// console.log(tesla.__proto__);

// console.dir(EV.prototype.constructor);
console.log(tesla);
tesla.chargeBattery(90);
tesla.brake();
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} speeded up to ${this.speed}kmph`);
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} slowed down to ${this.speed}kmph`);
    return this;
  }

  get SpeedUS() {
    return `${this.speed / 1.6} mph`;
  }

  set SpeedUS(speed) {
    this.speed = speed * 1.6;
    console.log(`${this.speed} kmph`);
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBatterry(chargeTo) {
    this.#charge = chargeTo;
    console.log(`${this.make}'s battery charged to ${this.#charge}%`);
    return this;
  }

  accelerate() {
    this.speed += 10;
    this.#charge--;
    console.log(
      `${this.make} speeded up to ${this.speed}kmph, charge now at ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);

// console.log(rivian);
// rivian
