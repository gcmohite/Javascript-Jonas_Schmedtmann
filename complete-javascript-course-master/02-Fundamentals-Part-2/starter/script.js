// Activating Strict Mode
'use strict';

// let hasDriversLicense = false;
// const passTest = true;

// if (passTest) hasDriversLicense = true;
// if (hasDriversLicense) console.log(`I can drive now.`);

// const interface = 'Audio';
// const private = 534;

/*
// ================= FUNCTIONS =================

function logger() {
  console.log('My name is Jonas');
}

// calling / running / invoking the function
logger();
logger();

// the function logger()  does not return any value and when a function doesnt return any value, the default return value will be undefined
console.log(logger());

// function fruitProcessor(apples, oranges) {
//   const juice = `Juice with ${apples} apples and ${oranges} oranges`;
//   return juice;
// }

function fruitProcessor(apples, oranges) {
  // console.log(apples, oranges);
  // console.log(typeof apples, typeof oranges);

  if (apples === 0) apples = 'no';
  if (oranges === 0) oranges = 'no';

  if (apples === undefined && oranges === undefined) {
    return 'You did not specify anything';
  } else if (oranges === undefined) {
    return 'Please specify how many oranges';
  } else if (apples === undefined) {
    return `Please specify how many apples`;
  } else {
    const juice = `Juice with ${apples} apples and ${oranges} oranges`;
    return juice;
  }
}

let appleOrangeJuice = fruitProcessor(0, 5);
console.log(appleOrangeJuice);

appleOrangeJuice = fruitProcessor(4, 0);
console.log(appleOrangeJuice);

appleOrangeJuice = fruitProcessor(3, 5);
console.log(appleOrangeJuice);

appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

console.log(fruitProcessor(3, 2));
*/

/*
// FUNCTION DECLARATION AND FUNCTION EXPRESSION

// Funtion declarations can be called before they are defined in the code but we cannot do the same with function expressions

// Function Declaration

const age1 = calcAge1(1988);

function calcAge1(birthYear) {
  // const age = 2037 - birthYear;
  // return age;

  return 2037 - birthYear;
}
console.log(age1);

// Function Expresssion
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};
const age2 = calcAge2(1988);
console.log(age2);
*/

/* 
// ARROW FUNCTION
const calcAge3 = (birthYear) => 2037 - birthYear;
const age3 = calcAge3(1988);
console.log(age3);

const yearsUntilRetire = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  // return retirement;
  return `${firstName} retires in ${retirement} years`;
};
console.log(yearsUntilRetire(1988, 'Gautam'));
console.log(yearsUntilRetire(1980, 'Bob')); 
*/

/* 
// FUNCTIONS CALLING OTHER FUNCTIONS

function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} pieces of apples and ${orangePieces} pieces of orange.`;
  return juice;
}

console.log(fruitProcessor(2, 3)); 
*/

/* 
// Functions Review

const calcAge = (birthYear) => 2037 - birthYear;

function retirementAge(birthYear) {
  const age = calcAge(birthYear);
  return 65 - age;
}

const yearsUntilRetire = function (birthYear, firstName) {
  const age = calcAge(birthYear);
  const retirement = retirementAge(birthYear);
  if (retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years`);
    return retirement;
  } else if (retirement === 0) {
    console.log(`This is ${firstName}'s retirement year.`);
    return retirement;
  } else {
    console.log(`${firstName} has already retired.`);
    return -1;
  }
};

console.log(yearsUntilRetire(1988, 'Gautam'));
console.log(yearsUntilRetire(1972, 'Mike'));
console.log(yearsUntilRetire(1966, 'Bob')); 
*/

/* //Coding Challenge 1
let dolphins1 = 44;
let dolphins2 = 23;
let dolphins3 = 71;

let koalas1 = 65;
let koalas2 = 54;
let koalas3 = 49;

const calcAverage = (score1, score2, score3) =>
  (score1 + score2 + score3) / 3.0;

let dolphinsAverage = calcAverage(dolphins1, dolphins2, dolphins3);

let koalasAverage = calcAverage(koalas1, koalas2, koalas3);

// console.log(dolphinsAverage, koalasAverage);

const checkWinner = function (avgDolphins, avgKoalas) {
  if (avgDolphins >= 2 * avgKoalas) {
    console.log(`Dolphins win (${avgDolphins} vs ${avgKoalas})`);
    return 1;
  } else if (avgKoalas >= 2 * avgDolphins) {
    console.log(`Koalas win (${avgKoalas} vs ${avgDolphins})`);
    return -1;
  } else {
    console.log(`Nobody wins`);
    return 0;
  }
};

checkWinner(dolphinsAverage, koalasAverage);

dolphins1 = 85;
dolphins2 = 54;
dolphins3 = 41;

koalas1 = 23;
koalas2 = 34;
koalas3 = 27;

dolphinsAverage = calcAverage(dolphins1, dolphins2, dolphins3);
koalasAverage = calcAverage(koalas1, koalas2, koalas3);

checkWinner(dolphinsAverage, koalasAverage); */

/*
// ARRAYS

const friend1 = 'Michael';
const friend2 = 'Steven';
const friend3 = 'Peter';

const friends = [friend1, friend2, friend3];
console.log(friends);

const y = new Array(1991, 1984, 2008, 2020);
console.log(y);

console.log(friends[0]);
console.log(friends[2]);

console.log(friends.length);
console.log(`There are ${friends.length} entries in the array 'friends'.`);

// Getting the last element of an array
console.log(friends[friends.length - 1]);

// Mutating an array - Arrays can be mutated even if they are declared using const, only primitves are immutable and arrays are not primitives

friends[2] = 'Jay';
console.log(friends);

const firstName = 'Jonas';
const jonas = [firstName, 'Schmedtmann', 2037 - 1991, 'teacher', friends];
console.log(jonas);

// Exercise

const calcAge = (birthYear) => 2037 - birthYear;

const years = [1990, 1967, 2002, 2010, 2018];

const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);

// or we can also do this
const ages = [
  calcAge(years[0]),
  calcAge(years[1]),
  calcAge(years[years.length - 1]),
];

console.log(ages);
*/

/* // Array Operations (Array Methods)
const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);
console.log(friends.length);

// Adding an element to the end of an array
const newLength = friends.push('Jay');
console.log(friends);
console.log(newLength);

// Adding an element to the beginning of an array

friends.unshift('John');
console.log(friends);
// Removing the last element from an array
// friends.pop();
const popped = friends.pop();
console.log(popped);
console.log(friends);

// Removing the first element from and array
const first = friends.shift();
console.log(first);
console.log(friends);

// Getting the index of an element
console.log(friends.indexOf('Steven')); // 1
console.log(friends.indexOf('Gautam')); // -1

// Checking if an element exists inside an array
console.log(friends.includes('Steven')); // true
console.log(friends.includes('Gautam')); // false */

/* // Coding Challenge

// const calcTip = function (billValue) {
//   return billValue >= 50 && billValue <= 300
//     ? billValue * 0.15
//     : billValue * 0.2;
// };

const calcTip = (billValue) =>
  billValue >= 50 && billValue <= 300 ? billValue * 0.15 : billValue * 0.2;

const bills = [125, 555, 44];
console.log(bills);

const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
console.log(tips);

const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
console.log(total); */

/*
// OBJECTS

const jonas = {
  firstName: 'Jonas',
  lastName: 'Schmedtmann',
  age: 2037 - 1991,
  job: 'teacher',
  friends: ['Michael', 'Steven', 'Peter'],
};

// Retrieving data form an object - dot vs bracket notation

console.log(jonas.lastName); //dot notation

console.log(jonas['lastName']); // bracket notation

// The bracket notation is handy to computing object properties 
console.log(jonas[`${'lastName'}`]);
const nameKey = 'Name';
console.log(jonas['last' + nameKey]);
console.log(jonas['first' + nameKey]);
console.log(`${jonas[`last${nameKey}`]}, ${jonas[`first${nameKey}`]}`);

/*
const interestedIn = prompt(
  'What do you want to know about Jonas? Choose between firstName, lastName, age, job, and friends'
  );
  console.log(jonas[interestedIn]);
  
  if (jonas[interestedIn]) {
    console.log(jonas[interestedIn]);
  } else {
    console.log(
      'Wrong request! Choose between firstName, lastName, age, job, and friends'
  );
}


// Creating new object properties after object has been defined.
jonas.location = 'Portugal';
jonas['twitter'] = '@jonasschmedtman';

console.log(jonas)
*/

/*
// Challenge
// "Jonas has 3 friends and his best friend is Michael"
console.log(
  `${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is ${jonas.friends[0]}`
);
*/

/*
// OBJECT METHODS
const jonas = {
  firstName: 'Jonas',
  lastName: 'Schmedtmann',
  birthYear: 1991,
  job: 'teacher',
  friends: ['Michael', 'Steven', 'Peter'],
  hasDriversLicense: true,

  // calcAge: function (birthYear) {
  //   return 2037 - birthYear;
  // },

  // calcAge: function () {
  //   return 2037 - this.birthYear;
  // },
    
  calcAge: function () {
    console.log(this);
    
    // will create a new property 'age' inside the object 'jonas' which can be accessed later, but for the property to be created. the function (method) should be called first.
    this.age = 2037 - this.birthYear;

    return this.age;
  },

  retiresIn: function () {
    return `${this.firstName} retires in ${65 - this.age} years.`;
  },

  getSummary: function () {
    this.summary = `${this.firstName} is a ${this.calcAge()} year old ${
      this.job
    }. He has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`;
    return this.summary;

    // return `${this.firstName} is a ${this.age} year old ${this.job}. He has ${
    // this.hasDriversLicense ? 'a' : 'no'
    // } driver's license.`;
  },
};

// undefined because the creation of the property 'age' in the 'jonas' object depends on the invocation of the method jonas.calAge
console.log(jonas.age);

console.log(jonas.calcAge()); // 46

// now that the method jonas.calcAge() has been called, the property jonas.age has been created, and now we can access it. This method of invoking a function to create a property is helpful because once the method is called, we need not calculate the same thing again (although we can), we can just store it in a property and access it later
console.log(jonas.age); // 46

// console.log(jonas.retiresIn());

console.log(jonas.getSummary());
console.log(jonas.summary);

// Challenge
// Write a method called getSummary and it should return a string about Jonas
// "Jonas is a 46 year old teacher. He has a/no driver's license"

/* // Coding Challenge

const mark = {
  firstName: 'Mark',
  lastName: 'Miller',
  mass: 78,
  height: 1.69,

  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

const john = {
  firstName: 'John',
  lastName: 'Smith',
  mass: 92,
  height: 1.95,

  calcBMI: function () {
    this.fullName = `${this.firstName} ${this.lastName}`;
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

console.log(
  mark.calcBMI() > john.calcBMI()
    ? `${mark.firstName} ${mark.lastName}'s BMI (${mark.BMI}) is higher than ${john.firstName} ${john.lastName}'s (${john.BMI})`
    : `${john.firstName} ${john.lastName}'s BMI (${john.BMI}) is higher than ${mark.firstName} ${mark.lastName}'s (${mark.BMI})`
); */

/*
// ===============  LOOPS  ===================

// for (let rep = 1; rep <= 10; rep++) {
//   console.log(`lifting weights ${rep}`);
// }

// LOOPING  THROUGH ARRAYS
const jonas = [
  'Jonas',
  'Schmedtmann',
  2037 - 1991,
  'teacher',
  ['Michael', 'Peter', 'Steven'],
  true,
];

const types = [];

for (let i = 0; i < jonas.length; i++) {
  console.log(`${jonas[i]}`);

  // types[i] = typeof jonas[i];

  types.push(typeof jonas[i]);

  if (types.length === jonas.length) {
    console.log(types);
  }
}

const years = [1991, 2007, 1969, 2020];

const ages = [];

for (let i = 0; i < years.length; i++) {
  ages.push(2037 - years[i]);

  if (ages.length === years.length) {
    console.log('Ages --> ', ...ages);
  }
}

// Continue and Break
console.log('--- ONLY STRINGS ---');
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] !== 'string') continue;

  console.log(jonas[i], typeof jonas[i]);
}

console.log('--- BREAK IF A NUMBER IS FOUND ---');
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] === 'number') break;
  console.log(jonas[i], typeof jonas[i]);
}

// LOOPING BACKWARDS AND LOOPS IN LOOPS

for (let i = jonas.length - 1; i >= 0; i--) {
  console.log(`[${i}]`, jonas[i]);
}

const workouts = ['bench-press', 'bicep-curls', 'squats'];

for (let i = 0; i < workouts.length; i++) {
  console.log(`===== ${workouts[i]} =====`);

  for (let set = 1; set <= 3; set++) {
    console.log(`**set ${set} 🤸‍♀️**`);
    for (let j = 1; j <= 15; j++) {
      console.log(`rep ${j}`);
    }
  }
}
*/

// WHILE LOOP

// for (let rep = 1; rep <= 10; rep++) {
//   console.log(`Lifting weights repetition ${rep} 🤸‍♀️`);
// }

// let rep = 1;
// while (rep <= 10) {
//   // console.log(`Lifting weights repetition ${rep} 🤸‍♀️`);
//   rep++;
// }

// let dice = Math.trunc(Math.random() * 6) + 1;
// // console.log(dice);

// while (dice !== 6) {
//   console.log(`You rolled a ${dice}`);
//   dice = Math.trunc(Math.random() * 6) + 1;

//   if (dice === 6) {
//     console.log('Loop is about to end...');
//   }
// }

/*
// Coding Challenge

const calcTip = function (bill) {
  if (bill >= 50 && bill <= 300) {
    return bill * 0.15;
  } else {
    return bill * 0.2;
  }
};

const calcTip = (bill) => {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

const tips = [];
const totals = [];

for (let i = 0; i < bills.length; i++) {
  tips.push(calcTip(bills[i]));
  totals.push(tips[i] + bills[i]);

  if (tips.length === bills.length) {
    console.log(tips);
    console.log(totals);
  }
}

const calcAverage = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    // sum = sum + arr[i];
    sum += arr[i];
  }
  return sum / arr.length;
};

console.log(calcAverage(totals));
console.log(calcAverage(tips));
*/
