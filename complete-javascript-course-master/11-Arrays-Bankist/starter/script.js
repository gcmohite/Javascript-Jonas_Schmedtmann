'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Creating DOM elements for movements
const displayMovements = function (movements, sort = false) {
  // clearing the html elements inside the .movements div
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  // looping over the 'movements' array of each object and creating an element for each transaction(movement)
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // using template literal to construct the html, so we are just writing the whole html code as a string and then attaching the generated html text as html code using insertAdjacentHTML.
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements(account1.movements);

// DISPLAYING THE TOTAL BALANCE
const calcDisplayBalance = function (account) {
  //creating a 'balance' property in the object of the current account
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance}€`;
};

// calcDisplayBalance(account1.movements);

// DISPLAYING THE SUMMARY (IN, OUT, INTEREST)
const calcDisplaySummary = function (account) {
  const ins = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${ins}€`;

  const outs = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outs)}€`;

  //assuming that interest of 1.2 % is paid for every deposit and only if the interest amount is greater than 1 EUR
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * account.interestRate) / 100)
    .filter((mov, i, arr) => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// calcDisplaySummary(account1.movements);

// COMPUTING USERNAMES
// Here we are taking the 'accounts' array which contains each account object as an element,  and for each 'owner' property of each object we are doing string and map operations to create a username which is the initials of every owner. And then we are creating a property called 'username' for each object which stores the username string.
const createUserNames = function (accts) {
  accts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserNames(accounts);

const updateUI = function (account) {
  // Display movements
  displayMovements(account.movements);
  // Display balance
  calcDisplayBalance(account);
  // Display Summary
  calcDisplaySummary(account);
};

// EVENT HANDLERS

// Login Button
// creating a global variable to store the object of the account which has logged in. This variable is used by other event handlers too but they do not update it, but thats okay because the login event handler is called first, which updates it and is then used by other handlers.
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // Prevents form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    // removes the focus from the pin input field
    inputLoginPin.blur();

    // Update the UI
    updateUI(currentAccount);
  }
});

// Amount Transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);

  const receiverAccount = accounts.find(
    acc => acc?.username === inputTransferTo.value
  );

  // clearing the fields once the button is pressed
  inputTransferAmount.value = '';
  inputTransferTo.value = '';

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    // doing the transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    // update UI
    updateUI(currentAccount);
  } else {
    alert(`You do not have suffucient balance`);
  }
});

// Requesting a loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);

  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov >= loanAmount * 0.1)
  ) {
    currentAccount.movements.push(loanAmount);

    // clear field
    inputLoanAmount.value = '';

    // update UI
    updateUI(currentAccount);
  }
});

// Closing an account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    // console.log(`deleted`);
    const userIndex = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // delete the user
    accounts.splice(userIndex, 1);

    // hide UI
    containerApp.style.opacity = 0;

    // clear fields
    inputCloseUsername.value = '';
    inputClosePin.value = '';
  }
});

// Sorting the movements

// Global variable to toggle the sorting status
let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted; // flipping the variable for the next click
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
// Objects can have methods, both built-in and created by us and since arrays are also objects due to prototypal inheritance. arrays also have built-in methods

// SLICE METHOD
// extracts part of an array without mutating the original array, (the returned value will be an array even if we are extracting a single element)

let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2)); // starting and includes from array index 2,
console.log(arr.slice(2, 4)); // from index 2 to 4, excluding 4
console.log(arr.slice(-1)); // gets an array with the last element
console.log(arr.slice(-2)); // gets an array with the last two elements
console.log(arr.slice(1, -2)); // [ "b", "c" ]

// Slice method can be used to create a shallow copy of an array
console.log(arr.slice()); // [ "a", "b", "c", "d", "e" ]
console.log([...arr]); // same as doing this, but slice method can be handy when we need to chain multiple methods together

// SPLICE METHOD
// mutatues the array by removing, replacing and/or adding elements to it
console.log(arr.splice(2)); // [ "c", "d", "e" ]
console.log(arr); // [ "a", "b" ]

// Usually used to remove unwanted elements from an array, in many cases the last element
arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr); // [ "a", "b", "c", "d", "e" ]
arr.splice(-1);
console.log(arr); // [ "a", "b", "c", "d" ]

// at index 2, remove 0 elements, and add 'g'
arr.splice(2, 0, 'g');

// if the start index is greater than the array length, then no elements will be removed, and if we specify any item(s), they will be added.
arr.splice(10, 2, 'e');
arr.splice(2, 1); // remove 1 element starting from index 2

// REVERSE METHOD
// reverses the order of elements in an array and also mutates the original array.

const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());

// CONCAT METHOD
// used to merge two or more arrays. does not change the existing arrays, but instead returns a new array.

const letters = arr.concat(arr2); // same as [...arr, ...arr2]
console.log(letters);
// [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j" ]

// JOIN METHOD
// Joins the elements  of an array into a string (concats), using parameter specified inside the join method as a separator
console.log(letters.join()); // a,b,c,d,e,f,g,h,i,j
console.log(letters.join('-')); // a-b-c-d-e-f-g-h-i-j

// Just refer MDN docs if you forget any, nobody knows all the methods byheart

// AT METHOD
// returns the element of an array (not in the form of an array but just the element itself) specified by the index that we want, does not mutate original array

console.log(arr.at(1)); // b

// Handy in extracting the last element of an array

// traditional ways to get last element of an array
console.log(arr.slice(-1)[0]); // 'e'
console.log(arr[arr.length - 1]); // 'e'

// using the at method to get last element of an array
console.log(arr.at(-1)); // 'e'

// at method also works on strings
console.log('gautam'.at(0)); // 'g'
console.log('gautam'.at(-1)); // 'm'
*/

/*
// LOOPING ARRAYS: forEACH LOOP

movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// using a for-of loop
for (const [i, movement] of movements.entries()) {
  let transaction = movement > 0 ? 'deposited' : 'withdrew';

  console.log(`${i + 1}. ${Math.abs(movement)} ${transaction}`);
}

// using forEach
// forEach is actually a higher-order function and takes a callback function which tells it what action to take. The 'event' in this case is each element of the array and forEach will loop over the array and call the function for every element iteration(the event in this case) and pass that element as the parameter to the callback function. So in this case for every iteration the parameters passed will be
//  0: function(200)
//  1: function(450)
//  2: function(-400)
//  3: function(3500)
//  4: function(-650)
//  5: function(-130)
//  6: function(70)
//  7: function(1300)
console.log(`------------------------forEach--------------------------`);
movements.forEach(function (movement) {
  let transaction = movement > 0 ? 'deposited' : 'withdrew';
  console.log(`${Math.abs(movement)} ${transaction}`);
});

// In for-of loop we would get the values and index from the .entries() method, similarly in the forEach method we can do it in the following way, that's because for every iteration, the forEach method not only passes the element of the array to the callback function, but also the index of the element in the array and the entire array itself (just in case we need them). ALso, the order in which it passes is: first the element, then the index, and then the entire array. Based on that we can make use of it in whatever way we need, by giving them our own variable names
console.log(`------------------------forEach--------------------------`);
movements.forEach(function (movement, index, array) {
  let transaction = movement > 0 ? 'deposited' : 'withdrew';
  console.log(`${index + 1}. ${Math.abs(movement)} ${transaction}`);
  // console.log(array);
});

////////////////////////////////////////////////////////////////////////////////////////
/// NOTE: We cannot break out of the forEach loop, so break and continue wont work, but they do work in for-of loop
////////////////////////////////////////////////////////////////////////////////////////

// forEach WITH MAPS

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// Similar to how forEach loops through an array, the parameters passed here in each iteration are: the value, the key and the entire map
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// forEach WITH SETS

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);

currenciesUnique.forEach(function (value, key, set) {
  console.log(value, key, set);
});

// Sets dont have keys because each value is unique, hence the key parameter for a set (we just named it key here, could be anything) will be the same as the value, its just there to be consistent with the 3 parameter passing of forEach.

// We can use an underscore ('_') as a variable name in place of 'key' because in JS, '_' is treated as a throwaway variable, something which is of no use or has no meaning
currenciesUnique.forEach(function (value, _, set) {
  console.log(value, _, set);
});
*/

/*
// CODING CHALLENGE #1

const dogs = {
  test1: {
    julia: [3, 5, 2, 12, 7],
    kate: [4, 1, 15, 8, 3],
  },

  test2: {
    julia: [9, 16, 6, 8, 3],
    kate: [10, 5, 6, 1, 4],
  },
};

const { julia: julia1, kate: kate1 } = { ...dogs.test1 };
const { julia: julia2, kate: kate2 } = { ...dogs.test2 };

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice().splice(1, 2);
  const allDogs = dogsJuliaCorrected.concat(dogsKate);

  allDogs.forEach(function (dog, i) {
    const dogIs =
      dog >= 3 ? `an adult, and is ${dog} years old` : `still a puppy 🐶`;
    console.log(`Dog number ${i + 1} is ${dogIs}`);
  });
  // console.log(allDogs);
};

checkDogs(julia1, kate1);
checkDogs(julia2, kate2);
*/

/////////////////////////////////////////////////////////////////////
// DATA TRANSFORMATIONS: MAP, FLTER, REDUCE
/////////////////////////////////////////////////////////////////////

// MAP - returns a new array containing the results of applying an operation on all original array elements
// FILTER - returns a new array containing the array elements that passed a specified test condition
// REDUCE - "boils down"/reduces the elements of an array to a single value(which can be anything, an object, a different transformed array or a single primitive value) and returns that value.

// MAP

const euroToUsd = 1.1;

const movementsUSD = movements.map(function (mov) {
  return mov * euroToUsd;
});

// console.log(movements);
console.log(movementsUSD);

//rewriting the above callback function as an arrow function
const movementsUSDArrow = movements.map(mov => mov * euroToUsd);
console.log(movementsUSDArrow);

// writing the above using a for-of loop
// const newUSD = [];
// for (const mov of movements) {
//   newUSD.push(mov * euroToUsd);
// }
// console.log(movementsUSD);

// just like the forEach method, MAP also passes parameters in the same order: value, key, object/array

movements.map(function (mov, i) {
  const transaction = mov > 0 ? 'deposited' : 'withdrew';
  console.log(`Transaction ${i + 1}: You ${transaction} ${Math.abs(mov)}`);
});

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);

// FILTER

// Here we are using the filter method to create an array which has only deposits (movement value > 0)
// we left in the i and arr parameters just to remind of the order parameters are passed to the callback function
const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});

// Similarly creating an array of only withdrawals (with arrow functions)
const withdrawals = movements.filter(mov => mov < 0);

console.log(deposits); // [ 200, 450, 3000, 70, 1300 ]
console.log(withdrawals); // [ -400, -650, -130 ]

// REDUCE
// Unlike other callback functions, the first parameter that the callback function takes in the reduce method is an 'accumulator', followed by the element, index and the entire array. The accumulator keeps accumulating values (as the reduce method loops over the array) and eventually becomes the final reduced value which is returned. The callback function is the first parameter of the reduce method, and the second parameter will be the initial value of the accumulator. Whatever value we return in an iteration will be the accumulator value of the next iteration.
const balance = movements.reduce(function (acc, cur, i, arr) {
  // console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0);

// Writing the callback function as an arrow
// const balance2 = movements.reduce((acc, cur) => acc + cur, 0);

console.log(balance); // 3840

// Getting the maximum value
const maximum = movements.reduce((acc, mov) => {
  if (acc > mov) {
    // console.log(acc, mov);
    return acc;
  } else {
    // console.log(acc, mov);
    return mov;
  }
}, movements[0]);

/*
// CODING CHALLENGE #2

const testData = {
  test1: [5, 2, 4, 1, 15, 8, 3],
  test2: [16, 6, 10, 5, 6, 1, 4],
};

const { test1: ages1, test2: ages2 } = testData;

const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(val => {
    if (val <= 2) {
      return val * 2;
    } else {
      return 16 + val * 4; // [ 36, 4, 32, 2, 76, 48, 28 ]
    }
  });

  const adultDogs = humanAge.filter(val => val >= 18); //  [ 36, 32, 76, 48, 28 ]

  const avg =
    adultDogs.reduce((acc, val) => {
      return acc + val;
    }, 0) / adultDogs.length;

  // const avg = adultDogs.reduce((acc, val, i, arr) => {
  //   return acc + val / arr.length;
  // }, 0);

  return avg;
};


calcAverageHumanAge(ages1);
calcAverageHumanAge(ages2);

console.log(calcAverageHumanAge(ages1), calcAverageHumanAge(ages2));
*/

/*
// PIPELINEING / CHAINING METHODS
// The third arr parameter which contains the entire array can come in handy to check what exactly the array is we are working on whenever we are doing such chaining of methods, because after each method, the array would be transformed to something different.
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * euroToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);
*/

////////////////////////////////////////////////////////////////////
/// NOTE: Avoid chaining too many methods as it will lead to performance issues when dealing with huge arrays. Also be careful about using destructive methods like splice and reverse because it would mutate the original data.
////////////////////////////////////////////////////////////////////

/*
// CODING CHALLENGE #3

const testData = {
  test1: [5, 2, 4, 1, 15, 8, 3],
  test2: [16, 6, 10, 5, 6, 1, 4],
};

const { test1: ages1, test2: ages2 } = testData;

const calcAverageHumanAge = ages => {
  const avg = ages
    .map(val => {
      if (val <= 2) {
        return val * 2;
      } else {
        return 16 + val * 4;
      }
    })
    .filter(val => val >= 18)
    .reduce((acc, val, i, arr) => {
      return acc + val / arr.length;
    }, 0);

  return avg;
};

calcAverageHumanAge(ages1);
calcAverageHumanAge(ages2);

console.log(calcAverageHumanAge(ages1), calcAverageHumanAge(ages2));
*/

/*
// FIND METHOD
// The find method is also a method that accepts a callback function and calls the function for every iteration of the array, and returns the FIRST element (not array) which satisfies a condition.

// loops through the accounts array which has every account object and returns the object whose username is 'js'
const lookingFor = accounts.find(acc => acc.username === 'js');

// doing the above using a for-of loop
// for (const acc of accounts.values()) {
//   if (acc.username === 'js') {
//     console.log(acc);
//   }
// }
console.log(lookingFor);

// finds the first withdrawl amount
const firstWithdrawl = movements.find(mov => mov < 0);
console.log(firstWithdrawl);

// FINDINDEX METHOD
// returns the index of the first element we are looking for in an array based on test condition

console.log(movements.findIndex(val => val === -650)); // 4
console.log(movements.findIndex(val => val > 1000)); // 3

console.log(accounts.findIndex(val => val.username === 'js')); // 2
*/

/*
// SOME AND EVERY METHODS

// SOME
// the 'includes' method checks if an element is present in an array and returns a Boolean value. But the 'some' method does more than that, it checks for any condition that we define in the callback function and then returns a Boolean value

// console.log(movements.includes(-130));  // true

// checks if there are any positive movements in the movements array
const anyPositiveMovement = movements.some(mov => mov > 0);
console.log(anyPositiveMovement); // true

// checks if there are any movements above 5000
const anyMovement5000 = movements.some(mov => mov > 5000);
console.log(anyMovement5000); // false

// EVERY
// only returns true if all the elements of the array pass a condition that we set in the callback function
const foo = movements.every(mov => typeof mov === 'string');
console.log(foo); // false

// all movements in account4 are deposits
console.log(account4.movements.every(mov => mov > 0)); // true

////////////////////////////////////////////////////////////////////
// The callback function that we write inside array methods can be written separately outside and then used inside the methods later.

const deposit = mov => mov > 0;

console.log(movements.some(deposit)); // true
console.log(movements.every(deposit)); // false
console.log(movements.filter(deposit)); // [ 200, 450, 3000, 70, 1300 ]
*/

/*
// FLAT AND FLATMAP METHODS
// FLAT: If there are any arrays nested inside an array, then we can use the FLAT method to 'spread' those inner arrays and then return an array containing no nesting. However, by default the flat method works for only one level of nesting, if there are arrays within those inner arrays i.e 2 levels of nesting, then we need to provide an argument of '2' to the flat method

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

console.log(arr.flat()); // [ 1, 2, 3, 4, 5, 6, 7, 8 ]

const arrDeep = [[1, [2, 3]], [[4, 5], 6], 7, 8];
console.log(arrDeep.flat()); // [ 1, [2, 3], [4, 5], 6, 7, 8 ]
console.log(arrDeep.flat(2)); // [ 1, 2, 3, 4, 5, 6, 7, 8 ]

// const accountMovements = accounts.map(acc => acc.movements);
// const allMovements = accountMovements.flat();
// const overallBalance = allMovements.reduce((acc, val) => acc + val, 0);

const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, val) => acc + val, 0);
console.log(overallBalance);

// FLATMAP
// Using a map and then the flat method chained to it is very common, hence we have a separate method for it called FLATMAP. It combines the map and flat method (in that order) into one method. The callback function will be whatever callback we have inside the map method.
// flatMap goes only one level deep for flattening the arrays

// const allMovements2 = accounts.flatMap(acc => acc.movements);

const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, val) => acc + val, 0);
console.log(overallBalance2);
*/

/*
// SORTING ARRAYS
// The sort method sorts an array alphabetically and/or numerically
// The default sort order is ascending, built upon converting the elements into strings (UTF-16)
// The sort method mutates the original array into a sorted array
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];

console.log(owners.sort()); // ["Adam", "Jonas", "Martha", "Zach" ]

// Since the sort array does the sorting based on converting the elements into strings, sorting of an array containing numbers wouldn't result in what we expect
console.log(movements); // [ 200, 450, -400, 3000, -650, -130, 70, 1300 ]
console.log(movements.sort()); // [ -130, -400, -650, 1300, 200, 3000, 450, 70 ]

// We can achieve true number sorting, by passing a compare callback function into the sort method which takes two arguments that hold the current and next value. The compare function compares the two values using subtraction and if the result is positive, puts the next value before the current value and if the result is negative, does nothing

// if a > b --> b, a (return some positive number)
// if a < b --> a, b (return some negative number)

movements.sort((a, b) => {
  if (a > b) {
    return 1; // reverse the order of current and next element
  }

  if (a < b) {
    return -1; // keep the same order for current and next element
  }
});
console.log(movements);

// To sort in descending order, we do the opposite of the above
movements.sort((a, b) => {
  if (a > b) {
    return -1; // reverse the order of current and next element
  }

  if (a < b) {
    return 1; // do nothing with current and next element
  }
});
console.log(movements);

movements.sort((a, b) => a - b);  // ascending
console.log(movements);

movements.sort((a, b) => b - a);  // descending
console.log(movements);
*/

/*
// CREATING AND FILLING ARRAYS

// creates an array with 7 empty slots. However its not of much use since we cannot use it for anything, like using any methods on it.
let x = new Array(7); // Array(7) [ <7 empty slots> ]

// hence with the new constructor, we can use the FILL method

// The fill method takes, 3 arguments: the value we want to fill in, the index where we need to start filling and the index where we want to end (not including the end index). The fill method can be used to fill both empty arrays and arrays containing elements. It mutates the array on which we use it.

x.fill(); // [ undefined, undefined, undefined, undefined, undefined, undefined, undefined ]

x.fill(0); // [ 0, 0, 0, 0, 0, 0, 0 ]

x.fill(1, 3, 5); // [ 0, 0, 0, 1, 1, 0, 0 ]

let arr = [1, 2, 3, 4, 5, 6, 7];
arr.fill(23, 2, 6); // [ 1, 2, 23, 23, 23, 23, 7 ]

// We can use the Array.from function to create arrays
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

// const z = Array.from({ length: 7 }, (cur, i) => i + 1);
const z = Array.from({ length: 7 }, (_, i) => i + 1);

console.log(z);

const diceRolls = Array.from({ length: 100 }, () =>
  Math.trunc(Math.random() * 100)
);

// The Array.from function was created to create arrays out of other iterables i.e strings, maps and sets etc (basically convert an array like structure to an array)
// Whenever we use querySelectorAll, it generates a node list, which is an array like structure but not really an array, so in order to convert it to an array (if we need to do array operations on it), we can use the Array.from function. Inside the Array.from we will have access to the val,i,arr and so we can use callback functions inside to set the array elements to whatever we want

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    sel => Number(sel.textContent.replace('€', ''))
  );
  console.log(movementsUI);
})
*/

/*
// ARRAY METHODS PRACTICE

// calculate how much is deposited across all bank accounts
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(val => val > 0)
  .reduce((acc, val) => acc + val, 0);
console.log(bankDepositSum);

// calculate how many deposits were made across all accounts for atleast 1000 dollars
// const depAbove1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

const depAbove1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

console.log(depAbove1000);
// Note: We cant use count++ here because the increment operator does the operation on a varable but returns the old value always, so in this case if we did count++, it would incerement, but return 0 every time because we set that as the initial value for count. We can do the pre-increment here i.e ++count and it will first increment and then return the incremented value

// CREATING A NEW OBJECT USING THE REDUCE METHOD
// Create an object which contains the sum of the deposits and withdrawls

const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawls += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawls'] += cur; // can also do like this
      return sums;
    },
    { deposits: 0, withdrawls: 0 }
  );
console.log(sums);

// get the total deposits and withdrawls from movements and store in an object using reduce
const transactionSums = movements.reduce(
  (sums, cur) => {
    // cur > 0 ? (sums[0] += cur) : (sums[1] += cur);
    sums[cur > 0 ? 0 : 1] += cur;
    return sums;
  },
  [0, 0]
);
console.log(transactionSums);

// convert any string to TitleCase (all the words are capitalized)
// this is a nice title ---> This Is a Nice Title

const str = `this is a nice title`;

const convertTitleCase = function (title) {
  const exceptions = [
    'a',
    'an',
    'the',
    'but',
    'or',
    'on',
    'in',
    'with',
    'and',
    'for',
    'so',
    'yet',
    'as',
    'is',
  ];

  const capitalize = str => str.replace(str[0], str[0].toUpperCase());
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .reduce((str, cur, i) => {
      exceptions.includes(cur) && i !== 0
        ? str.push(cur)
        : str.push(capitalize(cur));
      return str;
    }, [])
    .join(' ');
  console.log(titleCase);
};

convertTitleCase(str);
convertTitleCase('this is A LONG title but not too long');
convertTitleCase('and here is another title wih an EXAMPLE');
*/

/*
// CODING CHALLENGE #4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(dog => {
  dog.recFood = Math.trunc(dog.weight ** 0.75 * 28);
});
console.log(dogs);

const sarahDogIs = dogs
  .filter(dog => dog.owners.includes('Sarah'))
  .reduce((str, cur) => {
    const owner = cur.owners[cur.owners.indexOf('Sarah')];
    str = `${owner}'s dog is eating too`;
    cur.curFood > cur.recFood ? (str += ' much') : (str += ' little');
    return str;
  }, '');

console.log(sarahDogIs);

const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

const strTooMuch =
  ownersEatTooMuch.reduce((acc, val) => {
    acc += ` and ${val}`;
    return acc;
  }) + `'s dogs eat too much`;
console.log(strTooMuch);

const strTooLittle =
  ownersEatTooLittle.reduce((acc, val) => {
    acc += ` and ${val}`;
    return acc;
  }) + `'s dogs eat too little`;
console.log(strTooLittle);

const exactFood = dogs.some(dog => dog.curFood === dog.recFood);
const okayFood = dogs.some(
  dog => dog.curFood >= 0.9 * dog.recFood && dog.curFood <= 1.1 * dog.recFood
);

const okayFoodDogs = dogs
  .filter(
    dog => dog.curFood >= 0.9 * dog.recFood && dog.curFood <= 1.1 * dog.recFood
  )
  .flatMap(dog => dog.owners);
console.log(okayFoodDogs);

const recFoodSort = dogs
  .slice()
  .sort((dog1, dog2) => dog1.recFood - dog2.recFood);
console.log(recFoodSort);
*/
