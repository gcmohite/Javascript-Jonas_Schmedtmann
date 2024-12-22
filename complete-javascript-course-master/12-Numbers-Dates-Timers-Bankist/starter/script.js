'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-04-18T17:01:17.194Z',
    '2023-04-22T23:36:17.929Z',
    '2023-04-23T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return `today`;
  if (daysPassed === 1) return `yesterday`;
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();

  // return `${day}/${month}/${year}`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.movementsDates[i]);
    const displayDate = formatMovementDate(date, account.locale);

    const formattedMovement = formatCur(mov, account.locale, account.currency);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMovement}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, Print remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // decrease 1s
    time--;

    if (time === 0) {
      // When 5 minutes done, stop timer and logout user
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
  };
  // setting time to 5 minutes
  let time = 300;
  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// Fake always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// Experimenting with Intl API
// const now = new Date();
// const options = {
//   minute: 'numeric',
//   hour: 'numeric',
//   day: 'numeric',
//   month: 'long', // can be '2-digit'
//   year: 'numeric',
//   weekday: 'long', // can be 'short', 'narrow' etc
// };

// getting locale from the user's browser
// const locale = navigator.language;
// console.log(locale);

// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const options = {
      minute: 'numeric',
      hour: 'numeric',
      day: 'numeric',
      month: 'numeric', // can be 'long' '2-digit' etc
      year: 'numeric',
      // weekday: 'long', // can be 'short', 'narrow' etc
    };
    // const locale = navigator.language;

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year} ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

// Transferring amount to different account
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }

  // reset timer
  clearInterval(timer);
  timer = startLogoutTimer();
});

// Requesting loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add transfer date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }

  inputLoanAmount.value = '';

  // reset timer
  clearInterval(timer);
  timer = startLogoutTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
// CONVERTING AND CHECKING NUMBERS
// In JS all numbers are represented as floating point numbers, even integers.
console.log(23 === 23.0); // true

// All numbers will be stored in 64-bit format. While representing floating point numbers, there will be some precision lost and there will be underflow errors.

console.log(0.1 + 0.2); // 0.30000000000000004   (LOL)
console.log(0.1 + 0.2 === 0.3); // false   (LOL)

console.log(Number((0.1 + 0.2).toFixed(1)) === 0.3); // true

// Ways to convert strings to numbers
console.log('23'); // "23"
console.log(Number('23')); // 23
// Instead of the above, we can take advantage of type coercion and do this
console.log(+'23'); // 23

// Parsing
// The Number constructor object has parseInt() and parseFloat() methods which can convert numeric characters in strings to numbers

// parseInt - the string should start with number and it will take only the integer value. parsetInt takes 2 arguments, the string and the base to which the number should be converted to (base-2, base-10 etc). If not specified, it defaults to base 10.
console.log(Number.parseInt('30px')); // 30
console.log(Number.parseInt('4.5rem')); // 4
console.log(Number.parseInt('e23')); // NaN

console.log(Number.parseInt('1010', 2)); // 10  <-- decimal
console.log(Number.parseInt('111px', 2)); // 7

// parseFloat - the string should start with number and it will take the floating number
console.log(Number.parseFloat('2.5rem')); // 2.5
console.log(Number.parseFloat('e23')); // NaN

// NOTE: Whitespaces in the string will be ignored for parseInt and parseFloat
console.log(Number.parseFloat('  2.5   rem   ')); // 2.5

// parseInt and parseFloat are actually global functions and they need not be called only on the Number object, they can be used on their own. But thats the old way of calling these functions and its better to use it with the Number object because Number constructor provides a namespace
console.log(parseFloat('8.6px')); // 8.6

// isNaN - checks if expression is NaN
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(20 - '20px')); // true
console.log(Number.isNaN(23 / 0)); // false (Infinity !== NaN)

// isFinite - checks if a number is finite
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite(23 / 0)); // false
console.log(Number.isFinite(false)); // false
console.log(Number.isFinite('20')); // false
console.log(isFinite('20')); // true
console.log(Number.isFinite(20 - '20px')); // false (NaN is not finite)

//////////////////////////////////////////////////////
//// Number.isFinite() is best for checking if an expression results to a number because it returns false for everything except numbers. However isFinite() used just by itself will not do so.
//////////////////////////////////////////////////////
*/

/*
// MATH AND ROUNDING

console.log(Math.sqrt(25)); // 5
console.log(25 ** (1 / 2)); // 5
console.log(27 ** (1 / 3)); // 3

// max and min values - the max and min methods also does type coercion, but do not do parsing
console.log(Math.max(5, 8, 23, 11, 2)); // 23
console.log(Math.max(5, 8, '23', 11, 2)); // 23
console.log(Math.max(5, 8, '23px', 11, 2)); // NaN

console.log(Math.min(5, 8, 23, 11, 2)); // 2
console.log(Math.min(5, 8, '23', 11, 2)); // 2
console.log(Math.min(5, 8, '23px', 11, 2)); // NaN

// mathematical constants - in-built properties defined on the Number constructor for some maths constants
console.log(Math.PI); // 3.141592653589793
console.log(Math.E);  // 2.718281828459045
console.log(Math.SQRT2); // 1.4142135623730951
console.log(Math.PI * Number.parseFloat('10px') ** 2); // 314.1592653589793

// pseudorandom numbers
console.log(Math.trunc(Math.random() * 6) + 1);

// generating pseudorandom numbers between two ranges
const randomInt = (min, max) =>
  min + Math.floor(Math.random() * (max - min)) + 1;
console.log(randomInt(20, 50));

// Rounding Integers with Math.trunc(). It also does type conversion to numbers wherever possible
console.log(Math.trunc(23.3)); // 23
console.log(Math.trunc('23.3')); // 23

// Math.round() - rounds to the nearest integer
console.log(Math.round(23.3)); // 23
console.log(Math.round(23.5)); // 24
console.log(Math.round(23.7)); // 24

// Math.ceil - rounds UP to next integer
console.log(Math.ceil(23.3)); // 24
console.log(Math.ceil(-23.5)); // -23
console.log(Math.ceil(23.7)); // 24

// Math.floor - rounds DOWN to next integer
console.log(Math.floor(23.3)); // 23
console.log(Math.floor(-23.5)); // -24
console.log(Math.floor(23.7)); // 23

// Rounding decimals
// toFixed - used on a number value as a method. It rounds the number to the specified digits after decimal point. The returned value will be a string.
console.log((3.335).toFixed(2)); // "3.33"
console.log((3.336).toFixed(2)); // "3.34"
console.log((3.35).toFixed(1)); // "3.4"
console.log(+(3.335).toFixed(2)); // 3.33
console.log(+(3.336).toFixed(2)); // 3.34
console.log(+(3.35).toFixed(1)); // 3.4

////////////////////////////////////////////////////////////////////////
// The toFixed is a method which looks like its operating on a number which is a primitive value, but primitives dont have methods. In reality, the toFixed does boxing i.e converts the primitive to a Number object and then after doing the operation return a primitive (string)
///////////////////////////////////////////////////////////////////////
*/

/*
// REMAINDER OPERATOR (MODULO)
console.log(5 % 2); // 1
console.log(8 % 3); // 2

const isEven = num => num % 2 === 0;

console.log(isEven(7));
console.log(isEven(8));
console.log(isEven(4343249));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    // if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});
*/

/*
// NUMERIC SEPARATORS
// When using numbers to assign values, we can use the underscore character as a separator, JS will ignore it while assigning values
// We can use these underscore separators in our code to display numbers in better ways (maybe by using the replace method)
// 287,460,000,000
const diameter = 287_460_000_000; // looks like 287,460,000,000
console.log(diameter); // 287460000000

const price = 345_99; // looks like 15.99
console.log(price); // 1599

const fees1 = 15_00; // looks like 15.00
console.log(fees1); //1500
const fees2 = 1_500; // looks like 1,500
console.log(fees2); // 1500

// However the underscore separator cannot be used at the beginning or ending or a number, or just before or just after the decimal place
//

let PI = 3.14_15;
console.log(PI); //3.1415
// PI = 3_.1415 --> error
// PI = 3._1415 --> error
// PI = _3.1415 --> error
// PI = 3.1415_ --> error
// PI = 3.14__15 --> error

// When we try to convert string that contain numbers and underscores, it wont work as expected. So its best to use these underscore separators only in the code while assigning to variables
console.log(Number('230000')); // 230000
console.log(Number('230_000')); // NaN
console.log(parseInt('230_000')); // 230
*/

/*
// WORKING WITH BIGINT
// Numbers in JS are represented in 64 bit format, 53 bits hold the actual value and the remaining bits are for sign and position of decimal point. Therefore the max integer value that can be stored safely with guaranteed precision and accuracy is 2^53 - 1 = 9007199254740991. This number is also stored in the Number namespace as MAX_SAFE_INTEGER. If we hold any number bigger than this then there wont be any guarantee of precision.

console.log(2 ** 53 - 1); // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

// But sometimes we need numbers bigger than this. Hence we have bigint. We specify a number to be of type bigint by adding an 'n' at the end
const n = 75397593759375767765460302844028083403840383508; // integer
const num = 75397593759375767765460302844028083403840383508n; // bigint

// We can also use the BigInt object to create a bigint number or to convert a regular number to bigint (numbers less than 2**53 - 1 can also be bigint)
let num1 = 1234567;
console.log(num1); // 1234567
num1 = BigInt(num1);
console.log(num1); // 1234567n

// Operations
console.log(10000n + 10000n); // 20000n
console.log(12n - 12n); // 0n
console.log(338793759375943795739573975903n * 100000000n);
// 33879375937594379573957397590300000000n

const huge = 4973975943759302142303439439n;
const regular = 23;
// console.log(huge * regular); // error
// We cannot do operations with a bigint and a regular number, we need to convert the regular number to bigint first
console.log(huge * BigInt(regular)); // 14401446706463949272979107097n

// However comparison and concatenation operators work with regular and bigint
console.log(20n > 15); // true
console.log(20n === 20); // false
console.log(20n == 20); // true
console.log(20n == '20'); // true

console.log(huge + ' is really big!!');
// 4973975943759302142303439439 is really big!!

// Division with bigint
// when dividing two bigint numbers, it will only return the quotient i.e cut off the decimal part
console.log(10n / 3n); // 3n
console.log(12n / 3n); // 4n
console.log(3n / 4n); // 0n
*/

// CREATING DATES

// There are 4 ways of creating dates in JS, all use the Date constructor function but take different parameters

// 1.
const now1 = new Date();
// console.log(now1); // Mon Apr 24 2023 10:08:50 GMT+0530 (India Standard Time)

// 2. Parsing a date from a date string
const now2 = new Date('2023 Apr 24 2023 22:27');
// console.log(now2); // Mon Apr 24 2023 10:08:50 GMT+0530 (India Standard Time)

//3. Creating date by string we provide (avoid this as the dates we specify may be unreliable)
const date = new Date('December 25 2020 19:30'); // Fri Dec 25 2020 00:00:00 GMT+0530 (India Standard Time)
// console.log(date);

// account1.movementsDates.forEach(date => {
//   console.log(new Date(date));
// });

// 4. Besides passing a string, we can also pass the year, month, day, hour, minutes, second, milliseconds as arguments, in that order (the month parameter is 0 based, for e.g May would be 4)
// console.log(new Date(2023, 4, 10, 14, 4, 13));
// Wed May 10 2023 14:04:13 GMT+0530 (India Standard Time)

// It also autocorrects the date (Nov has no 31st day, so it took the extra day as the first day of Dec). Also there are no 26 hrs in a day so it incremented the day again and wrote the extra hours minutes and seconds
// console.log(new Date(2023, 10, 31, 26, 4, 13));
// Sat Dec 02 2023 02:04:13 GMT+0530 (India Standard Time)

console.log(new Date(0)); // UNIX time
// Thu Jan 01 1970 05:30:00 GMT+0530 (India Standard Time)

console.log(new Date(3 * 24 * 60 * 60 * 1000));
// Sun Jan 04 1970 05:30:00 GMT+0530 (India Standard Time)

// Working with dates
const future = new Date(2037, 10, 19, 15, 23, 5);
console.log(future); // Thu Nov 19 2037 15:23:05 GMT+0530 (India Standard Time)

console.log(future.getFullYear()); // 2037
console.log(future.getMonth()); // 10 <-- Nov
console.log(future.getDate()); // 19 <-- day of the month
console.log(future.getDay()); // 4 <-- day of the week
console.log(future.getHours()); // 15
console.log(future.getMinutes()); // 23
console.log(future.getSeconds()); // 5
console.log(future.getMilliseconds()); // 0
console.log(future.toISOString()); // "2037-11-19T09:53:05.000Z"
console.log(future.getTime()); // 2142237185000

console.log(new Date(2142237185000)); // Thu Nov 19 2037 15:23:05 GMT+0530 (India Standard Time)

console.log(Date.now()); // 1682313241442

future.setFullYear(2040);
future.setMonth(4);
console.log(future); // Sat May 19 2040 15:23:05 GMT+0530 (India Standard Time)

/*
// OPERATIONS WITH DATES
// We can do operations with dates, like subtracting one date from another to get the number of days between the two dates. We can do this using the timestamps

const future = new Date(2037, 10, 19, 15, 23, 5);
// Thu Nov 19 2037 15:23:05 GMT+0530 (India Standard Time)

// We can convert the Date to a number using the Number object
console.log(Number(future)); // 2142237185000
// Same thing can be done if we use the + operator on the date string
console.log(+future); //  2142237185000

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

console.log(calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4)));
*/

/*
// INTERNATIONALIZING DATES
// JS has a new API called Intl for internationalizing dates

// INTERNATIONALIZING NUMBERS
const num = 3884764.23;

const options = {
  // style: 'percent',
  // style: 'unit',
  style: 'currency',
  // unit: 'celsius',
  currency: 'EUR',

  // useGrouping: false, // to turn on or off the separators
};

console.log('India: ', new Intl.NumberFormat('en-IN', options).format(num));
console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));
console.log('UK: ', new Intl.NumberFormat('en-GB', options).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria: ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log(
  'Browser: ',
  new Intl.NumberFormat(navigator.language, options).format(num)
);
*/

/*
// TIMERS
// In JS we have 2 types of timers
// setTimeOut - runs just once, after a defined time
// setInterval - keeps running basically forever, at intervals until we stop it

// setTimeOut receives a callback function and calls that function after the specified time (in milliseconds). It does not stop the program execution till its completed, other statements will keep executing. In other words, it executes asynchronously.

setTimeout(() => console.log(`Here is your pizza 🍕`), 3000); // this will show after 3s

console.log(`Waiting...`); // this will show first

// In case we need to pass arguments into the callback function, we can specify them after the time argument and also include them in the callback function arguments (its a callback function so we cannot call it, the setTimeOut will call it).

const ingredients = ['olives'];

const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza 🍕 with ${ing1} and ${ing2}`),
  4000,
  ...ingredients
);

// We can cancel the setTimeOut execution before the specified time using the built-in clearTimeout function
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval
// the setInterval calls the callback function after every interval we specify

// setInterval(function () {
//   const now = new Date();
//   const hour = String(now.getHours()).padStart(2, 0);
//   const min = String(now.getMinutes()).padStart(2, 0);
//   const sec = String(now.getSeconds()).padStart(2, 0);
//   console.log(`${hour}:${min}:${sec}`);
// }, 1000);
*/

// The setInterval timer can be cancelled by using the clearInterval built-in function

// IMPLEMENTING A COUNTDOWN TIMER
