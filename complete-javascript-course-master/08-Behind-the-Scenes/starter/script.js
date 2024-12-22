'use strict';

/*
// SCOPE AND SCOPE CHAIN
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  // we can access the firstName variable since it will already be in the Global EC variable environment and the scope chain will get it too
  console.log(firstName);

  function printAge() {
    // here we can access the global variable firstName, the variable 'age' because it is in the scope of calcAge() which is the parent scope of this function, and scope chain lookup can find the variable, and since same applies to function parameters of the parent function, birthYear too can be accessed in this function.
    let output = `You are ${firstName}, ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      // the scope of 'millennial' will be the entire function block of printAge because var variables are function scoped, not block scoped.
      var millennial = true;

      // if we declare the variable firstName here with a different value, the template literal will pick that value because as per the scope chain rules JS will first lookup the variable in the current scope and since it found that value, it will use it (and not the global variable with the same name). Therefore we have 2 variables in two different scopes with the same name,.
      const firstName = 'Steven';

      // reassigning variable in outer scope - this will change the value of the variable 'output' but if we do const output = 'NEW OUTPUT', it will create a new variable altogether which is different from the one in the parent scope and will not alter that outer variable.
      // output = 'NEW OUTPUT!';

      const str = `0h, and you're a millennial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }

    // this is okay because variables declared with var are function scoped and ignore block scope.
    console.log(millennial);

    // This will throw an error because the function add() is block scoped inside the above if block (functions are block scoped in strict mode)
    // add(2, 3);

    console.log(output);
  }
  printAge();

  return age;
}

calcAge(1991);
const firstName = 'Jonas';

// however if we call the function before declaring the global variable 'firstName' JS will throw a lexical error

// ReferenceError: Cannot access 'firstName' before initialization
// calcAge(1991); 
// const firstName = 'Jonas';
*/

/*
// VARIABLE ENVIRONMENT: HOISTING AND TDZ

// Variables hoisitng
console.log(me); // undefined
// console.log(job); // error - Cannot access 'job' before initialization
// console.log(year); // error - Cannot access 'year' before initialization

var me = 'Jonas';
let job = 'teacher';
const year = 1991;

// Functions hoisting
console.log(addDecl(2, 3));
// console.log(addArrow); // undefined because its of type var
// console.log(addArrow(2, 3)); // TypeError: addArrow is not a function because we are essentially doing undefined(2,3) 🤷‍♂️

// console.log(addExpr(2, 3));

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

// Pitfall of var Hoisting

// when the if block is executed, numProducts is undefined, which is a falsy value, so the condition will evaluate to true and the deleteShoppingCart function will be called even though the number of products is not zero. Hence is almost always a bad practice to use var

if (!numProducts) {
  deleteShoppingCart();
}

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}

//Variable declared using var in global scope will create a property on the global window object but not when created using let or const

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); // true
console.log(y === window.y); // false
console.log(z === window.z); // false

*/

/*
// this keyword
console.log(this); // 'this' keyword in the global scope is Window (the global Window object)

const jonas1 = {
  name: 'Jonas',
  year: 1989,
  calcAge: function () {
    return 2037 - this.year; // this === jonas1
  },
};

console.log(jonas1.calcAge());

const calcAge = function (birthyear) {
  console.log(2037 - birthyear);
  console.log(this); // undefined
};

calcAge(1991);

const calcAgeArrow = birthyear => {
  // console.log(2037 - birthyear);
  // the arrow function calcAgeArrow has no parent in the code and its parent will be the Window global object, hence the lexical 'this' will point to Window
  console.log(this); // global Window object
};

calcAgeArrow(1988);

const jonas2 = {
  name: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this); // this === jonas2 because its jonas2 object that is calling the method, not because calcAge is inside jonas2
    return 2037 - this.year;
  },
};

jonas2.calcAge();

const matilda = {
  firstName: 'Matilda',
  year: 2017,
};

matilda.calcAge = jonas2.calcAge; // method borrowing

matilda.calcAge(); // when matilda object calls the calcAge method, 'this' keyword will be set to the matilda object

const f = jonas2.calcAge; // holds the function in a variable
console.log(f);
// f(); // undefined

document.querySelector('.heading').addEventListener('click', function () {
  console.log(this); // <h1> element
});

document.querySelector('.heading').addEventListener('click', () => {
  console.log(this); // global Window object
});

const jonas3 = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this);
    return 2037 - this.year;
  },
};
*/

// this keyword in Regular Functions vs Arrow Functions

// var firstName = 'Gautam';

const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this); // this === jonas
    console.log(2037 - this.year);

    const isMillenial1 = function () {
      console.log(this); //undefined
      // will throw an error because isMillenial here is a regular function declaration and therefore its this value will be undefined
      // console.log(this.year >= 1981 && this.year <= 1996);
    };

    const isMillenial2 = () => {
      console.log(this); // this === jonas
      // isMillenial here is an arrow function  and therefore its this value will be jonas, so there wont be an error when we execute the below statement
      console.log(this.year >= 1981 && this.year <= 1996); // true
    };

    isMillenial1();
    isMillenial2();
  },

  /////////////////////////////////////////////////////////////////////////////
  // So if there are functions to be written inside an object method its good to use arrow function, because we can use the 'this' keyword in them since the 'this' in the arrow function will point to the 'this' of the parent function (the object method), and the 'this' in the object method will point to the object.
  /////////////////////////////////////////////////////////////////////////////

  greet: () => {
    console.log(this); // Window

    // greet is an arrow function hence the lexical this for it is the parent function which in this case is the global Window object, and since there is no variable firstName inside the Window object, this.firstName is undefined. But for var variables, a property is created in the Window object, so if we declare a var type variable with a name of firstName and give it a value (say 'Gautam'), then it will print it as Hey Gautam because the lexical this is Window and it has a property of firstName when we decalared the var variable. This way of using an arrow function as a method gives problems (also the var causing unexpected behaviour), so its best to write object methods in the form of function expresssion/function declaration.
    console.log(`Hey ${this.firstName}`); //Hey undefined
  },
};

var firstName = 'Gautam';
console.log(`Hey ${this.firstName}`); //Hey Gautam

jonas.greet();
jonas.calcAge();

// Arguments keyword
const addExpr = function (a, b) {
  // in the variable environment, regular functions get an arguments object which stores the arguments it receives from the function call statement.
  console.log(arguments); //
  return a + b;
};

addExpr(2, 3);
console.log(addExpr(2, 3));

// It perfectly legal to provide more number of arguments than the function is meant to receive, it will simply store the extra arguments in the arguments object
addExpr(2, 3, 8, 9, 5);
console.log(addExpr(2, 3, 8, 9, 5));

// const addArrow2 = (a, b) => {
//   console.log(arguments); // error, arrow functions do not get arguments object
//   return a + b;
// };

// addArrow2(3, 4);

/*
// PRIMITIVES vs OBJECTS (Reference Values)

let age = 30;
let oldAge = age;
age = 31;
console.log(age); //31
console.log(oldAge); //30

const me = {
  name: 'Jonas',
  age: 30,
};

console.log(me.age); // 30

const friend = me;

//we change value of the age property of the object 'friend', but this changes the age property of the object 'me' also
friend.age = 27;

console.log(friend.age); //27
console.log(me.age); //27

let lastName = 'Williams';
let oldlastname = lastName;
lastName = 'Davis';

// console.log(lastName, oldlastname);

const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

let marriedJessica = jessica;
marriedJessica.lastName = 'Davis';

console.log(jessica.lastName); // 'Davis'
console.log(marriedJessica.lastName); // 'Davis'

// This will not work because we are here we are assigning a new empty object to marriedJessica because it would need to store a new heap memory location in the call stack but since we have already declared marriedJessica as const, changing the value will throw an invalid assignment error. If marriedJessica was decalared as a let, then it would be fine. COMPLETELY CHANGING THE VALUE OF THE OBJECT IS VERY DIFFERENT FROM CHANGING PROPERTIES OF THAT OBJECT
marriedJessica = {};

// Copying objects and then changing properties of one without affecting the other
// For this we can use the Object.assign() method, it will merge two objects and create a new object
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';
console.log(jessica2.lastName);
console.log(jessicaCopy.lastName);

console.log(jessica2);
console.log(jessicaCopy);
*/
