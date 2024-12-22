'use strict';

/*
// SETTING DEFAULT PARAMETERS
// sometimes it's useful to have functions where some parameters are set by default. This way we do not have to pass them in manually in case we don't want to change the default.

// If there are no values passed in the arguments by a function call, then we can set them in the function definition as default values.

// The default parameters that we set can be any expression/values, even other parameters of the same function, but that parameter should come before the one which we are defining next. So in the below function, if we set the 'price' parameter before 'numPassengers' parameter, then there will be an error (lexical error), because 'price' depends on 'numPassengers'

const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // setting default parameters in ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum, // using enhanced object literal here
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
//output: Object { flightNum: "LH123", numPassengers: undefined, price: undefined } (when no default parameters are set)

createBooking('LH123', 4);
//output: Object { flightNum: "LH123", numPassengers: 4, price: 796 }

//If we do this, the value 1000 will be assigned to numPassengers parameter, because each value will be mapped in order, therefore for the value which we dont know, we can set as undefined
createBooking('LH123', 1000);

//therefore for the value which we dont know, we can set as undefined, thereby skipping that parameter
createBooking('LH123', undefined, 1000);
//Object { flightNum: "LH123", numPassengers: 1, price: 1000 }
*/

/*
// PASSING BY VALUE AND PASSING BY REFERENCE

const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

console.log(flight);
console.log(jonas.name);

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 24739479284) {
    alert('Checked in :)');
  } else {
    alert('Wrong passport!');
  }
};

checkIn(flight, jonas);

console.log(flight); // ''LH234'
console.log(jonas.name); // Mr. Jonas Schmedtmann

// In the above code we see that after calling 'checkIn' function, it took the variable 'flight' and the object 'jonas' as arguments and manipulated them in the function (although not a good practice). After the function call is completed, when we inspect the values of 'flight', it is unchanged, but the 'name' property of the 'jonas' object is changed. That's because the function changed it and since objects are of reference type, changes made locally get reflected everywhere, because even when making changes locally we are still pointing to the same location where the object is stored. But in the case of primitives, if a function uses them, it changes only inside that scope.
// flightNum is a copy of the flight variable whereas passenger and jonas both point to the same memory address (which is stored in the call stack) of the location where the object is stored in the heap.

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000);
};

// newPassport(jonas);
// checkIn(flight, jonas);

// NOTE: Javascript does not have passing by reference, it only has passing by value, although it may seem like a lot of the times we are passing by reference, like in the case of passing objects as function parameters. We are actually still passing a value, and the value is the memory address where the object is stored. So we are actually passing a reference value (memory address) and not passing BY reference.
*/

/* 
// =====================================================================
// FIRST-CLASS AND HIGHER ORDER FUNCTIONS
JavaScript has first-class functions which means that functions are simply values and can be stored in variables, objects(as object methods), and even other functions (function methods). 

We can also pass functions as arguments to other functions, for example event handler functions which are passed inside the addEventListener function.

We also have function methods, which means that we can call functions on functions (for e.g the bind() method). That's because functions are also another 'type' of objects and we can have methods inside objects. 
Since functions are just another 'type' of objects and since objects are values, functions are values too.

We can also return a function from another function. (see bind method)

Having first-class functions enables us to write higher-order functions

A HIGHER-ORDER FUNCTION IS ONE WHICH RECEIVES ANOTHER FUNCTION AS AN ARGUMENT, OR RETURNS A FUNCTION, OR BOTH
(example: the addEventListener is a higher-order function which can receive an event handler function as an argument)

A FUNCTION THAT IS PASSED IN A HIGHER ORDER FUNCTION AS AN ARGUMENT IS CALLED A CALLBACK FUNCTION
This is because the higher-order function can call it at a later time. This happens not only in event listening, but in other contexts as well.

First-class functions vs Higher-order functions:
A first-class function is just a feature that a programming language has. It just means that functions can be treated as values. Its just a concept and first-class functions dont practically exist (its a layer of abstraction)
Whereas, higher-order functions do exist in our code, which are made possible because of the concept of first-class functions.
// =================================================================================
*/

/*
// FUNCTIONS ACCEPTING CALLBACK FUNCTIONS

const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [firstWord, ...otherWords] = str.split(' ');
  return [firstWord.toUpperCase(), ...otherWords].join(' ');
};

// console.log(upperFirstWord('tic tac toe'));

// console.log(oneWord('Gautam Mohite'));

//transformer() is a higher-order function which calls the callback function 'fn', which could be any function based on what we want to do with the string str. In this case fn could be upperFirstWord or oneWord.
// As we now know that functions can have methods, in addition to that functions can also have properties, and in the below function we make use of the 'name' property in the transformer() function to get the name of the callback function that was used.

const transformer = function (str, fn) {
  if (!fn) {
    console.error(`callback function not specified`);
    return;
  }

  const strNew = fn(str);
  console.log(
    `Original string: ${str}\nTransformed string: ${strNew}\nTransformed by: ${fn.name}`
  );
  return strNew;
};

// We only pass the function name upperFirstWord and not calling it here, hence no ()
transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);
// transformer('JavaScript is the best!');

// Another example, here addEventListener is the higher-order function and 'high5' is the callback function which is called when we click anywhere inside the HTML body.
const high5 = function () {
  console.log('✋');
};

document.body.addEventListener('click', high5);
['jonas', 'martha', 'adam'].forEach(high5);

//=================================================================================
// JS uses callbacks all the time. The advantages of using callbacks are:
// 1. It splits our code into re-usable 'components' which can be interconnected,
// making our code modular. (functional programming)
// 2. More importantly, allowes us to have a layer of abstraction to the code, thereby
// hiding the 'lower-level' details inside callback functions and thus we can
// focus on solving a problem at a higher level
//=================================================================================
*/

/*
// FUNCTIONS RETURNING FUNCTIONS

// Here 'greet' is a function which returns a function,
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

// when we call the function 'greet', it will 'become' another function and return back, and then we can use that returned function as we like, so we can do this:
greet('hi')('gautam');

// greet('Hey') will return a function and so we are storing it in a variable
let greeterHey = greet('Hey');
console.log(greeterHey);

// Now that variable is a function and so we call it using a name string
greeterHey('Gautam');
greeterHey('Steven');

// We can instead directly call the function like this since greet('Hey') is a function
greet('Hey')('Steven');

// Implementing the same using arrow functions
// const greet = greeting => name => console.log(`${greeting} ${name}`);

// just another example
const operate = function (n1, n2) {
  return function (operator) {
    if (operator === 'add') {
      console.log(n1 + n2);
      return n1 + n2;
    }
    if (operator === 'subtract') {
      {
        console.log(n1 - n2);
        return n1 - n2;
      }
    }
    if (operator === 'multiply') {
      {
        console.log(n1 * n2);
        return n1 * n2;
      }
    }
    if (operator === 'divide') {
      {
        console.log(n1 / n2);
        return n1 / n2;
      }
    }
  };
};

const data = operate(3, 4);

data('add');
data('multiply');
*/

/*
// THE CALL AND APPLY METHODS

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],

  // a method which takes customer information in the form of a string and an object and displays a short summary and then creates an object with booking related info and pushes it in the 'bookings' array
  book: function (flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      name: `${name}`,
    });
  },
};

lufthansa.book(234, 'Jonas');
lufthansa.book(635, 'Gautam');

// Creating another  new object for booking operations of Eurowings airlines, but instead of writing the method again like above (not very DRY), we can make use of the call method later
const euroWings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

// storing the method in a variable so that it can be used by itself and not only existing as a method inside the lufthansa object.
const book = lufthansa.book;

// book(234, 'gautam');
// but just calling the function wont work because 'book' is just a regular function and 'this' keyword points to undefined in strict mode for regular functions.

// The 'this' keyword depends on how the function is called, hence we now need to specify to JS explicitly in which context should we use the 'this' keyword, or in this context, to which object the 'this' object should point to. (whether 'lufthansa' or 'euroWings'). For achieving that, we can use the 'call' method on a function

// THE CALL METHOD
// The call method sets the 'this' keyword of a function to whichever object we want it to point to. The first argument that the 'call' method takes is the name of the object, followed by whatever parameters the function takes.

// in this case we took the 'book' function (which is a copy of the 'book' method in the 'lufthansa' object) and set its 'this' keyword to point to the 'euroWings' object
book.call(euroWings, 234, 'Jonas');

console.log(euroWings);

book.call(lufthansa, 239, 'mary');
console.log(lufthansa);

// creating another object for another airline
const swiss = {
  airline: 'Swiss Airlines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 234, 'gautam');

// APPLY METHOD
// The apply method works in the same way as that of the 'call' method, the first argument will be the name of the object to which we want to point to(setting the this property), but it does not take other arguments, instead it takes an array

const fligthData = [246, 'peter'];
book.apply(swiss, fligthData);

// The apply method is not much used anymore because, if we have an array to give as input, we can still use the 'call' method and then use the spread operator to give inputs from the array
book.call(swiss, ...fligthData);
console.log(swiss);
*/

/*
// THE BIND METHOD
// Just like the call and apply methods, the bind method also lets us manually set the 'this' keyword for any function call. The difference is that the bind method does not immediately call the function, it returns a new function where the 'this' keyword is set to whatever object we want to.

// This will not call a new function, but will return a new function with the 'this' keyword set to euroWings, and we're just storing it in a variable.
const bookEW = book.bind(euroWings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

//we can do the below because book.bind(euroWings) returns a function
// book.bind(euroWings)(246, 'steven');
// bookEW(246, 'steven'); // or this,
// console.log(euroWings);

// We can also further predefine some parameters of the function using the bind method. We can pass parameters in the call method after specifying the object to which 'this' should be set, similarly in the bind method, we can set the parameters but now these parameters will be 'set in stone' for that function. This is called partial application
const bookLH23 = lufthansa.book.bind(lufthansa, 23);
bookLH23('Jonas');
bookLH23('Martha');

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// When we click on the button, lufthansa object should be logged to console and the lufthansa.planes should be incremented, but we see that the button element is logged, that's because for event handlers, the this keyword always points to the element on which it is attached.
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

// so instead, we should explicitly set the this keyword to lufthansa
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application example
// Many a times we are not even interested in setting the this keyword but what we actually want is to set some parameters on a function, and we can do this using the bind method as we just saw. In such cases, we simply set the first argument of the bind method to null/undefined and as a result, we get a function whose 'this' points to undefined, thereby making it a normal function.
// Its better than setting default parameters on a function because in the bind method technique we get a whole new function.

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 100)); //110

// Here we are 'generating' a new function based on the function 'addTax' using the bind method. We are more interested in setting the rate parameter here, and not much into defining the this keyword, hence we set the this keyword to 'null' (could be anything but we just set it to null)
const addVAT = addTax.bind(undefined, 0.23);
// addVAT = value => value + value * 0.23;
console.log(addVAT(100)); // 123
console.log(addVAT(34)); // 41.82

// Implementing the same VAT calculation using the functions calling other functions technique
const addTAX2 = function (rate) {
  return function (value) {
    return value + rate * value;
  };
};

const addVAT2 = addTAX2(0.23, 100);
console.log(addVAT2(100)); //123
console.log(addVAT2(34)); //41.82
*/

/*
// CODING CHALLENGE #1
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],

  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
};

poll.registerNewAnswer = function () {
  let input = Number(
    prompt(
      `${this.question}\n${this.options.join('\n')}\n(Write option number)\n`
    )
  );

  if (input <= 3 && input >= 0) {
    this.answers[input]++;
  } else {
    while (!(input <= 3 && input >= 0)) {
      input = Number(prompt(`Try again: `));
      break;
    }
  }

  this.displayResults();
  this.displayResults('string');
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults = function (type = 'array') {
  if (type === 'array') {
    console.log(this.answers);
  } else if (type === 'string') {
    console.log(`Poll results are ${this.answers.join(', ')}`);
  }
};

poll.displayResults.call({ answers: [5, 2, 3] });
// poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');

// [5, 2, 3]
// [1, 5, 3, 9, 6, 1]
*/

/*
// IMMEDIATELY INVOKED FUNCTION EXPRESSIONS
// An IIFE is a function that is only executed once and never again.
// To make an IIFE we take an anonymous function and wrap it in parentheses, and immediately call it using ()
// We us an IIFE because functions create a scope and if we create data inside the IIFE, it will remain private, because it will not be accessible anywhere else and the function itself cannot be called again. The data will be encapsulated. In the below function, the variable isPrivate is encapsulated.

(function () {
  console.log('this will never run again');
  const isPrivate = 23;
})();
// console.log(isPrivate); //error: isPrivate not defined

// writing an IIFE as an arrow function
(() => console.log(`this will also never run again`))();

// However, IIFE's are not much used anymore because we can encapsulate data by just wrapping them in braces, which wasnt possible earlier. Although we can still use IIFE if we want a function to be executed only once.
{
  const isPrivate = 23; // cannot be accessed outside this block
  var notPrivate = 23; // can be accessed outside this block
}

// console.log(isPrivate); //error: isPrivate not defined
console.log(notPrivate);
*/

/*
// ClOSURES
// Any function will always have access to the variable environment of the execution context in which it is created, even after the execution context is removed from the call stack. The variable environment is attached to the function, exactly as it was, at the time and place the function was created.
// In other words, a closure gives a function access to all the variables of its parent function, even after that parent function has returned. The function keeps a reference to its outer scope, which preserves the scope chain throughout time. Thus we say that a function closes over its parent function.
// A closure makes sure that a function doesn’t loose connection to variables that existed at the function’s 'birth place';

// NOTE: variables in a function's closure will always be looked up first, even before looking up the scope chain.
// NOTE: We do NOT have to manually create closures, this is a JavaScript feature that happens automatically. We can’t even access closed-over variables explicitly. A closure is NOT a tangible JavaScript object.

const secureBooking = function () {
  let passengerCount = 0;
  let foo = 10;

  return function () {
    passengerCount++;
    foo++;
    console.log(`${passengerCount} passengers`);
  };
};

// const booker = secureBooking();

// booker();
// booker();
// booker();

// console.dir(booker);

let f;
const a = 4;

const g = function () {
  const a = 23;
  const c = 45;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b);
  };
};

g();
f();
console.dir(f);
h();
f();
console.dir(f);

(function () {
  const header = document.querySelector('h1');
  const body = document.querySelector('body');
  // header.style.color = '#ccc';

  body.addEventListener('click', function () {
    header.style.color = 'teal';
    body.style.background = 'white';
  });
})();

/*
// CODING CHALLENGE #2
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3:   C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer: function () {
    const input = Number(
      prompt(`${this.question}\n\n${this.options.join('\n')}\n`)
    );
    if (input >= 0 && input <= 3) {
      this.answers[input]++;
    }
    // console.log(this.answers);
    this.displayResults((type = 'string'));
  },
  displayResults: function (type) {
    if (type === 'array') console.log(this.answers);
    if (type === 'string')
      console.log(`Poll results are ${this.answers.join(', ')}`);
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

const answers = [5, 2, 3];
const display = poll.displayResults.bind({ answers: [5, 2, 3] });
display('string');
*/
