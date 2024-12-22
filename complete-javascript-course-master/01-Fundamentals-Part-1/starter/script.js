/*
let js = 'amazing';

// console.log(40 + 8 + 23 - 10);
console.log('Gautam');
console.log(23);

let firstName = 'Gautam';
let separator = ' ';
let lastName = 'Mohite';

console.log(firstName + separator + lastName);

let PI = 3.14159625;

let myCurrentJob = 'nothing';
let myNextJob = 'Frontend Developer';

console.log(
  'I presently work as',
  myCurrentJob,
  separator,
  'but soon I will become a',
  separator,
  myNextJob 
); 

*/

// Assignment

/* let country = 'India';
let continent = 'Asia';
let population = 1.4e12;

console.log(country, continent, population);

let isIsland = true;
let language;

console.log(typeof country);

let javascriptIsFun = true;
console.log(javascriptIsFun, typeof javascriptIsFun);

console.log(typeof true);
console.log(typeof 23);
console.log(typeof 'Gautam'); 

// we already declared the variable javascriptIsFun and now we are putting a new value in it. This time its a string and JS is dynamically typed so it automatically changes the type of the variable.
/*javascriptIsFun = 'Yes';
console.log(javascriptIsFun, typeof javascriptIsFun); */

/*let year;
// both the value and the type of 'year' are undefined
console.log(year, typeof year);

year = 1991;

// now the value of 'year' is 1991 and its type is number
console.log(year, typeof year); */

/* 
let age = 30;
age = 35;
const birthYear = 1988;
// birthYear = 1990;

// const what; */

/*
// Mathematical operators
const now = 2037;
const ageGautam = now - 1988;
const ageSarah = now - 2018;
console.log(ageGautam, ageSarah);

console.log(ageGautam * 2, ageGautam / 10, 2 ** 3);
// 2 ** 3 = 8--> exponent operator is **

const firstName = 'Gautam';
const lastName = 'Mohite';
// concatetnation operation
console.log(firstName + ' ' + lastName);

// Assignment operators
let x = 10 + 5; //  --> 15
x += 10; // x = x + 10; --> 25
x *= 4; // x = x * 4; --> 100
x++; // x = x + 1; --> 101
x--; // x = x - 1; --> 100
x--; // x = x - 1; --> 99
console.log(x);

// Comparison Operators (>, <, >=, <=)
console.log(ageGautam > ageSarah);
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;

console.log(now - 1988 > now - 2018);
*/

/* 
// Operator Precedence
const now = 2037;
const ageGautam = now - 1988;
const ageSarah = now - 2018;
console.log(now - 1988 > now - 2018);

let x = 1,
  y = 1; // we can declare two variables in one statement like this
console.log(x, y);

// we can also assign two varables at once like this
x = y = 25 - 10 - 5;
// Here the subtraction operator has more precedence than the assignment operator so it will be executed first, and subtraction works left to right, so the expression 25-10-5 will be calculated to be 10. Then the assignment operator will be executed. Assignment works right to left, hence the value 25-10-5 will be assigned to y and then the value of y will be assigned to x
console.log(x, y);

// Grouping (...) has highest precedence
const averageAge = (ageGautam + ageSarah) / 2;
console.log(ageGautam, ageSarah, averageAge);

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence */

/* // Coding Challenge #1

// Test data 1

// const heightMark = 1.69,
//   weightMark = 78;
// const heightJohn = 1.95,
//   weightJohn = 92;

//Test data 2

const heightMark = 1.88,
  weightMark = 95;
const heightJohn = 1.76,
  weightJohn = 85;

const markBMI = weightMark / heightMark ** 2;
// const markBMI2 = weightMark / (heightMark * heightMark);
const johnBMI = weightJohn / heightJohn ** 2;
// const johnBMI2 = weightJohn / (heightJohn * heightJohn);

// console.log('Mark height and weight: ', heightMark + 'm', weightMark + 'kgs');
console.log('Mark BMI:', markBMI);
// console.log('John height and weight: ', heightJohn + 'm', weightJohn + 'kgs');
console.log('John BMI:', johnBMI);

const markHigherBMI = markBMI > johnBMI;
console.log('Mark BMI higher?', markHigherBMI); */

/* // Strings and Template Literals
const firstName = 'Jonas';
const job = 'teacher';
const birthYear = 1991;
const year = 2037;

const jonas =
  "I'm " + firstName + ', a ' + (year - birthYear) + ' year old ' + job + '.';
console.log(jonas);

// Using template literals
const jonasNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}.`;
console.log(jonasNew);
console.log(`I'm ${firstName}`);

// We can just use templete literals for writing strings in general rather than using single or double quotes, which is much mroe convenient.
console.log(`Just a regular string.`);

// Also instead of doing this
console.log('Multi \nline \nstring');

// We can just use template literals and type normally along hitting ENTER and it will display it just like how we typed it.
console.log(`Multi
line
string`); */

/* // if/else statements

const age = 15;

if (age >= 18) {
  console.log(`Yes, you can apply for a license 🚗`);
} else {
  const yearsLeft = 18 - age;
  console.log(`Not yet, please try after ${yearsLeft} years.`);
}

const birthYear = 2012;

let century;
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}

console.log(century);

// const heightMark = 1.69,
//   weightMark = 78;
// const heightJohn = 1.95,
//   weightJohn = 92;

const heightMark = 1.88,
  weightMark = 95;
const heightJohn = 1.76,
  weightJohn = 85;

const markBMI = weightMark / heightMark ** 2;
const johnBMI = weightJohn / heightJohn ** 2;

if (markBMI > johnBMI) {
  console.log(
    `Mark's BMI (${markBMI.toFixed(
      2
    )}) is higher than John's (${johnBMI.toFixed(2)})`
  );
} else {
  console.log(
    `John's BMI (${johnBMI.toFixed(
      2
    )}) is higher than Mark's (${markBMI.toFixed(2)})`
  );
}  */

/*
// Type Conversion and Type Coercion
const inputYear = '1991';

// Since '1991' is a string, in the below statement JS will coerce the number 18 to become the string '18' and then concetenate it with the string inputYear
console.log(inputYear + 18); // '199118'

// We can convert a numeric string to a number using the Number()
const realNumber = Number(inputYear);
console.log(realNumber + 18);

// If a string has characters which are not numbers then Number() will give the output of NaN
console.log(Number('hello')); // --> output will be NaN

// Here the String() constructor will convert 23 to a string and then JS will concatenate it with 3 by coercing the 3 to become a string.
console.log(String(23) + 3); // '233'

console.log(String(23), 3); // '23' 3

// with + the type coercion converts numbers to strings but with the -, * and / operator it does the opposite, i,e converts strings to numbers
console.log('23' - 10 - '33'); // --> should produce output of -20
console.log('23' / 2); // --> 11.5
console.log('11' + 2 / 5 + 3 + 8 - 4 + '6');

console.log(77 + '2' + (33 / 3) * '5');

console.log('343a' + ((40 / '5') * 65) / 13 + '11');

console.log('45a' + '24' / 4 - '22' - '33a' * '40');
*/

/*
// TRUTHY AND FALSY VALUES
const money = 0;
if (money) {
  console.log(`Don't spend it all`);
} else {
  console.log(`You should get a job`);
}
// here the value of money is 0 hence the condition of the if statement will be evaluated to false and hence the else statement will be executed, because 0 is a falsy value

let height;
if (height) {
  console.log(`Yay height is defined.`);
} else {
  console.log(`Height is UNDEFINED ☹`);
}   
*/

/*
// Equality Operators == vs ===

const age = Number(prompt(`What is your age?`)); // the value will be stored as a string
console.log(age, typeof age);
if (age === 18) console.log(`You just became and adult. (strict)`);

if (age == 18) console.log(`You just became and adult. (loose)`);

// When taking numeric input strings its good to convert them to numbers
const userAge = prompt(`What is your age?`);
console.log(userAge, typeof userAge);
if (userAge === 18) console.log(`You just became and adult. (strict)`);

if (userAge == 18) console.log(`You just became and adult. (loose)`);

const favourite = Number(prompt(`What's your favourite number?`));
console.log(favourite, typeof favourite);

if (favourite === 23) {
  console.log(`Cool! 23 is an amazing number.`);
} else if (favourite === 7) {
  console.log(`7 is also a cool number`);
} else {
  console.log(`its neither 23 nor 7`);
}

// There is also !== and != for checking strict inequality and loose inequality
if (favourite !== 23) {
  console.log(`Why not 23!`);
}
*/

/*
BOOLEAN LOGIC
const hasDriversLicense = true; // A
const hasGoodVision = true; // B

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);

// const shouldDrive = hasDriversLicense && hasGoodVision;

if (hasDriversLicense && hasGoodVision) {
  console.log(`Yes you can drive.`);
} else {
  console.log(`Someone else should drive`);
}

const isTired = false;

if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log(`Yes you can drive.`);
} else {
  console.log(`Someone else should drive.`);
}
*/

/* // Coding Challenge
const dolphins1 = 97;
const dolphins2 = 112;
const dolphins3 = 80;

const koalas1 = 109;
const koalas2 = 95;
const koalas3 = 50;

const dolphinsScore = (dolphins1 + dolphins2 + dolphins3) / 3.0;
const koalasScore = (dolphins1 + dolphins2 + dolphins3) / 3.0;

console.log(dolphinsScore, koalasScore);

if (dolphinsScore > koalasScore && dolphinsScore >= 100) {
  console.log(`Dolphins Win`);
} else if (koalasScore < dolphinsScore && koalasScore >= 100) {
  console.log(`Koalas Win`);
} else if (
  dolphinsScore === koalasScore &&
  dolphinsScore >= 100 &&
  koalasScore >= 100
) {
  console.log(`Its a Draw. Both Win.`);
} else {
  console.log(`Nobody Wins.`);
} */

/*
// SWITCH STATEMENT

const day = 'friday';

switch (day) {
  case 'monday': // day === 'monday'
    console.log('plan the week');
    console.log('go to coding meetup');
    break;
  case 'tuesday':
    console.log('prepare theory videos');
    break;
  case 'wednesday':
  case 'thursday':
    console.log('Write code examples');
    break;
  case 'friday':
    console.log('record videos');
    break;
  case 'saturday':
  case 'sunday':
    console.log('enjoy the weekend');
    break;
  default:
    console.log('its ok, take rest');
}

if (day === 'monday') {
  console.log('plan the week');
  console.log('go to coding meetup');
} else if (day === 'tuesday') {
  console.log('prepare theory videos');
} else if (day === 'wednesday' || day === 'thursday') {
  console.log('Write code examples');
} else if (day === 'friday') {
  console.log('record videos');
} else if (day === 'saturday' || day === 'sunday') {
  console.log('enjoy the weekend');
} else {
  console.log('its ok, take rest');
}
*/

/* 
// CONDITIONAL OPERATOR
const age = 3;
age >= 18 ? console.log('I like wine 🍷') : console.log('I like milk 🥛');

// The conditional operator is a ternary operator hence it can produce values, and the generated value, can be assigned to a variable, and what value to assign will be based on the condition.
const drink = age >= 18 ? 'wine 🍷' : 'milk 🥛';
console.log(drink);

// Since its an operator and not a statement, we can use conditional expressions inside other things like a template literal

console.log(`I like to drink ${age >= 18 ? 'wine 🍷' : 'milk 🥛'}`); */

/*
// Coding Challenge

const bill = Number(prompt(`Enter bill amount: `));
let tip;

console.log(
  `The bill was ${bill}, and the tip was ${(tip =
    bill >= 50 && bill <= 300
      ? bill * 0.15
      : bill * 0.2)}, and the total value is ${bill + tip}.`
);
*/
