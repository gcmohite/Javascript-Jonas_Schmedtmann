'use strict';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function (obj) {
    console.log(obj);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

/*
// Traditionally we would do something like this to get and store a single array element from an array
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// With the modern destructuring assignment syntax, we can declare variables, and store values in them in a single statement
let [x, y, z] = arr;

console.log(arr); //original array remains unaltered
console.log(x); //2
console.log(y); //3
console.log(z); //4

// swapping two variables
[x, y] = [y, x];
console.log(x); //3
console.log(y); //2
console.log(z); //4
*/

/*
// here we are declaring two variables in the destructuring way and assigning the first two values 'categories' array in 'restaurant' object
// When there are more values than the variables, the values will be assigned one-to-one leaving the extra values unassigned.
let [main, secondary] = restaurant.categories;
console.log(main, secondary); //Italian Vegetarian

// in case we wanted the first and third element of the 'categories' array, we simply leave a hole in the destructuring syntax
// const [main, , secondary] = restaurant.categories;
// console.log(main, secondary); //Italian Vegetarian

// With destructuring, we can easily swap two variables in this way
[main, secondary] = [secondary, main];
console.log(main, secondary); //Vegetarian Italian

// here we are receiving an array and destructuring it and hence we can receive 2 return values from a function
const [starters, mainCourse] = restaurant.order(2, 0);
console.log(`${starters}, ${mainCourse}`); // Garlic Bread, Pizza

// We  can do destructuring within destructuring. In this case we are extracting the values from a nested array and storing them in variables.
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested; //destructuring
console.log(i, j, k); // 2 5 6

// We can set default values to variables while destructuring so that if there are more variables than values, then the variables dont remain go undefined
let [first, second, third] = [8, 9];
console.log(first, second, third); // 8 9 undefined
[first = 1, second = 1, third = 1] = [8, 9];
console.log(first, second, third); // 8 9 1
*/

/*
//DESTRUCTURING OBJECTS
// Here we are destructuring the object 'restaurant'. The variable names should exactly match the property names that we want to extract from the object.
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// then if we want, we can give our own names to the properties  (which we first extracted by specifying their exact name).
const {
  //'name' is the object property and restaurantName is the variable name which we just gave to 'name'
  name: restaurantName,
  openingHours: hours,
  categories: tags,
  location: address,
} = restaurant;

console.log(restaurantName, hours, tags);

// Setting default values
// We can set default values in the destructuring of objects too. This is helpful in case we are looking for a property inside the object but its not available. in those cases instead of that variable being left undefined, it will have some default value.

//here we are setting default value of variable 'menu' to emmpty array, and since there is no property called name in the 'restaurant' object, its value will be set to empty array instead of being undefined. in case of the starterMenu, there is such a property in 'restaurant', so it will ignore the default value and assign the property value (we have then renamed the variable to 'starters')
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables using destructring of objects

let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

// here we are assigning new values to a and b and the values are from the object 'obj'. but when we do
// {a,b} = obj; we will get an error because JS expects {} to be a code block and we cannot assign anything to a code block. so we get around it by wrapping it all in parentheses
({ a, b } = obj);
console.log(a, b);

// Destructuring with nested objects
// Here we are extracting the open and close properties as variables from the the object 'fri' which itself is nested within the object 'openingHours'
const {
  sat: { open, close },
} = restaurant.openingHours; //we could have only used 'openingHours' instead of 'restaurant.openingHours' since we already have 'openingHours' as a variable

// this function (actually object method belonging to 'restaurant' object) takes input values from an object and  destructes that object and makes vairables and uses them as parameters
restaurant.orderDelivery = function ({
  starterIndex = 1,
  mainIndex = 0,
  time = '22:00',
  address,
}) {
  console.log(
    `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} by ${time}`
  );
};

restaurant.orderDelivery({
  time: '22:30',
  mainIndex: 2,
  address: 'Via del Sole, 21',
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});
*/

/*
// SPREAD OPERATOR
// The spread operator is used to expand an array(or any iterable) into all its individual elements.
// we can use the spread operator whenever we would otherwise write multiple values separated by commas (so a good place to use will be when providing function arguments)
const arr = [7, 8, 9];
// if we use a spread operator on an array, it will list out the elements
console.log(...arr); // 7 8 9
// its the same as writing console.log(7,8,9);

let newMenu = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
  'Gnocci',
  'Lasagna',
];
console.log(newMenu);

//Here we are creating a new array neArr by adding our own elements and also including the array arr. It will not be nested inside newArr as an array but the elements will be added individually
const badArray = [1, 2, arr];
const newArr = [1, 2, ...arr];

console.log(arr); // [7, 8, 9]
console.log(newArr); // [1, 2, 7, 8, 9]
// if we use a spread operator on an array, it will list out the elements
console.log(...newArr); // 1 2 7 8 9

newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu); //[ "Pizza", "Pasta", "Risotto", "Gnocci" ]

// The difference between destructuring and spread operator is that the spread operator takes all the elements from the array and also does not create new variables. Hence we can only use it in places where we would otherwise write values separated by commas.

// console.log(...badArray); // 1 2 [7,8,9]

// In most use cases the spread operator is used to create shallow copy of arrays and to merge two arrays into one array. They are also used a lot to provide multiple comma separated arguments to functions
// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

//Join 2 arrays
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

//The spread operator actually works on all iterables.
// arrays, strings, maps, sets are all iterables. Objects are not iterables but after ES2018 we can use spread operator on objects too

const str = 'Gautam';
const leters = [...str, ' ', 'M.'];
console.log(leters); // ['G', 'a', 'u', 't', 'a', 'm', ' ', 'M.' ]
console.log(...leters); // G a u t a m   M.

//However this doesnt work because ${} is not a place which expects multiple values separated by commas, they are only expected when we pass arguments to a function or when we supply those values to be elements in an array
// console.log(`${...leters}`);

// restaurant.orderPasta = function (ingredient1, ingredient2, ingredient3) {
//   console.log(
//     `Here is your pasta with ${ingredient1}, ${ingredient2} and ${ingredient3}`
//   );
// };

// const test1 = 'abc';
// restaurant.orderPasta(...test1); //Here is your pasta with a, b and c

// const ingredients = [
//   prompt(`Let's make pasta! Ingredient 1? `),
//   prompt(`Ingredient 2? `),
//   prompt(`Ingredient 3? `),
// ];

// console.log(...ingredients);

// // traditionally we would do this
// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

// //but now we can use the spread operator on the 'ingredients' array to create comma separated list of arguments
// restaurant.orderPasta(...ingredients);

// SPREAD OPERATOR AND OBJECTS
// Post 2018 we can also use the spread operator with objects even though objects are not iterables.

// Here we have simply copied the object (all its properties) 'restaurant' inside the object 'newRestaurant' and it also has two additional properties, 'foundedIn' and 'founder'
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

// spread operator is very helpful to make shallow copies of objects, because if we otherwise just assign 'restaurant' into 'restaurantCopy' changing properties in one would also change properties of other, because basically both will be just identifiers pointing to the same address where the object is stored in the heap of the JS engine. But with below statement, we are creating a separate copy
const restaurantCopy = { ...restaurant };
// console.log(restaurantCopy);

restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name); // Ristorante Roma
console.log(restaurant.name); // Classico Italiano

const unpackNests = function (arr) {
  const marker = arr.length;

  for (let i = 0; i < marker; i++) {
    arr[i].length > 1 ? arr.push(...arr[i]) : arr.push(arr[i]);
  }

  return arr.splice(marker);
};

const result = unpackNests([
  1,
  5,
  7,
  3,
  [2, 8, 5],
  4,
  9,
  [2, 9, 6],
  [3, 2, 5],
  6,
  -1,
  0,
  34,
  [23, 78],
]);

console.log(result);

// const marker = 5;
// console.log(result.slice(result[marker] - 1));
*/

/*
// REST PATTERN AND REST PARAMETERS
// The Rest pattern has the same ... syntax as the spread operator but does the opposite of the spread operator. It collects multiple elements and condenses them into an array.
// The spread operator is to unpack an array while rest is to pack elements into an array.
// THe Rest pattern is used on the left side of the assignment operator and the spread is on the right

// REST, because on LEFT side of assignment operator
const arr = [1, 2, ...[3, 4]]; //[1, 2, 3, 4]
// console.log(arr);

// NOTE: We can use the rest operator only after the last vairable, it cannot be used in between, its like saying "collect the rest of the remaining values and put them into one array", which is what we are doing with the 'others' variable in the below statement.
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others); // 1 2 [3, 4, 5]
console.log(...[a, b, ...others]); // 1 2 3 4 5

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood); //

// Using Rest operator with Objects
const { fri, ...otherDays } = restaurant.openingHours;

// Functions

// Here we are using the Rest operator to collect all the values into single array 'numbers'. It may look like its on the right side of the assignment here but if we see closely, the 'right' side is actually the comma separated list of values which we provide while calling the add() function and hence now we are simply collecting them into an array.
const adder = function (...numbers) {
  // console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
  return sum;
};

adder(2, 3);
adder(5, 3, 7, 2);
adder(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
console.log(adder(...x)); //35

restaurant.orderPizza = function (mainIngredient, ...otherIngredients) {
  // console.log(mainIngredient);
  console.log(otherIngredients);

  if (!otherIngredients.length) {
    console.log(`Here is your pizza with only ${mainIngredient}`);
  } else {
    console.log(
      `Here is your pizza with ${mainIngredient}, along with ${otherIngredients.join(
        ', '
      )}`
    );
  }
};

restaurant.orderPizza('pepperoni');

restaurant.orderPizza('pepperoni', 'onion', 'olives', 'spinach');

// spread operator is used where we would otherwise write several values, separated by commas. On the other hand the rest pattern is basically used where we would otherwise write several variable names separated by commas.
*/

// SHORT CIRCUITING && and ||

// We can use && and || logical operators to also combine values other than Boolean values
// They can use any data type, they can return any data type, and they can do short circuiting

// In the case of || short-circuting, it will look for the first truthy value and immediately return that value. The rest of the expresssion will not be evaluated. If there are no truthy values found, then the last falsy value will be returned

// Similarly in case of && short-circuiting, it look for the first falsy value and immediately return that value. The rest of the expresssion will not be evaluated. If there are no falsy values found, then the last truthy value will be returned

console.log(`================ OR ================`);
console.log(3 || 'Jonas'); //3
console.log('Jonas' || 3); // 'Jonas'
console.log('' || 'Jonas'); // 'Jonas'
console.log(true || 'Jonas'); // true
console.log(true || 0); // true
console.log(undefined || null); // null
console.log(undefined || 0 || '' || 'hello' || 23 || null); // 'hello'

console.log(`================ AND ================`);
console.log(3 && 'Jonas'); // 'Jonas'
console.log('Jonas' && 3); // 3
console.log('' && 'Jonas'); // ''
console.log(true && 'Jonas'); // 'Jonas'
console.log(true && 0); // 0
console.log(undefined && null); // undefined
console.log(undefined && 0 && '' && 'hello' && 23 && null); // undefined
console.log('hello' && 23 && null && 'jonas'); //null
console.log(`======================================`);

restaurant.orderPizza = function (mainIngredient, ...otherIngredients) {
  // console.log(mainIngredient);
  // console.log(otherIngredients);

  if (!otherIngredients.length) {
    console.log(`Here is your pizza with only ${mainIngredient}`);
  } else {
    console.log(
      `Here is your pizza with ${mainIngredient}, along with ${otherIngredients}`
    );
  }
};

restaurant.numberOfGuests = 0;

const guests1 = restaurant.numberOfGuests ? restaurant.numberOfGuests : 10;
console.log(guests1);

// We can use the above conditional statement or simply use the || conditional operator like so. However there is a problem with this, if restaurant.numberOfGuests exists and has a numeric value of 0, which is a falsy value, it will still assign 10 to the variable guests2, which we dont want because 0 is a valid number. To avoid this logical pitfall, we can use the nullish coalescing operator. (shown below)
const guests2 = restaurant.numberOfGuests || 10;
console.log(guests2);

// Practical example
// The && operator first evaluates whether there is a property of orderPizza inside the restaurant object. If it doesn't exist it will simply stop further evaluation and in this case return undefined. But if the property exists, then it will call the method orderPizza
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'olives');

// NULLISH COALESCING OPERATOR
// Nullish values are null and undefined. Other falsy values (0, '', NaN) will be treated as true

const guests = restaurant.numberOfGuests || 10;
console.log(guests); // 10
const guestsCorrect = restaurant.numberOfGuests ?? 10;
console.log(guestsCorrect); // 0

/*
// LOGICAL ASSIGNMENT OPERATOR
const rest1 = {
  name: 'Capri',
  numGuests: 0,
};
const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// Let us set a default number of guests for restaurants for which number of guests is not defined
rest1.numGuests = rest1.numGuests || 10;
rest2.numGuests = rest2.numGuests || 10;

console.log(rest1);
console.log(rest2);

// But we can use LOGICAL OR ASSIGNMENT operator to write it this way
rest1.numGuests ||= 10;
rest2.numGuests ||= 10;

// But again as we saw before, if the value of numGuests is 0 in any of these cases then it will erroneously assign the value of 10.
// Hence we can use the LOGICAL NULLISH ASSIGNMENT OPERATOR (where only null and undefined are falsy and everthing else is truthy)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// We also have the LOGICAL AND ASSIGNMENT operator

rest1.owner &&= '<anonymous>';
rest2.owner &&= '<anonymous>';

console.log(rest1.owner); //undefined
console.log(rest2.owner); // '<anonymous>'
*/

/*
// CODING CHALLENGE #1

// 1. Create one player array for each team (variables 'players1' and
// 'players2')
// 2. The first player in any player array is the goalkeeper and the others are field
// players. For Bayern Munich (team 1) create one variable ('gk') with the
// goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
// field players
// 3. Create an array 'allPlayers' containing all players of both teams (22
// players)
// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a
// new array ('players1Final') containing all the original team1 players plus
// 'Thiago', 'Coutinho' and 'Perisic'
// 5. Based on the game.odds object, create one variable for each odd (called
// 'team1', 'draw' and 'team2')
// 6. Write a function ('printGoals') that receives an arbitrary number of player
// names (not an array) and prints each of them to the console, along with the
// number of goals that were scored in total (number of player names passed in)
// 7. The team with the lower odd is more likely to win. Print to the console which
// team is more likely to win, without using an if/else statement or the ternary
// operator.
// Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
// Then, call the function again with players from game.scored

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1.
const [players1, players2] = game.players;
console.log(players1, players2);

const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

const allPlayers = [...players1, ...players2];
console.log(allPlayers);

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

const printGoals = function (...names) {
  // console.log(names);

  for (let i = 0; i < names.length; i++) {
    console.log(names[i]);
  }
  console.log(`${names.length} goals were scored`);
  return names.length;
};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals('Davies', 'Muller');
printGoals(...game.scored);

// The team with the lower odd is more likely to win. Print to the console which team is more likely to win, without using an if/else statement or the ternary operator.
// rest1.numGuests ??= 10;

team1 < team2 && console.log(`${game.team1} is more likely to win.`);
team1 > team2 && console.log(`${game.team2} is more likely to win`);
*/

/*
// FOR-OF LOOP

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (let i = 0; i < menu.length; i++) {
//   console.log(menu[i]);
// }

// The for-of loop is handy to iterate through the elements of an array with simpler syntax, we dont need to set up a counter and increment it etc. So instead of the above old-school for loop code, can do the below. This loop will automatically loop over the entire array and in each iteration it will give us access to the current array element. We have specified the iteration variable as 'item' but we can set whatever we want. For each iteration 'item' will hold an element from the array
// We can also use continue and break keywords in for-of loop but not in other looping techniques, which we will see later (forEach)
for (const item of menu) {
  console.log(item);
}

console.log(menu.entries()); // Array Iterator { }

// But getting the current index is a bit of a hassle using for-of loop.
// Lets first see the built in 'entries' method which can be used on an array
const letters = ['a', 'b', 'c'];

// this will return Array Iterator { }
console.log(letters.entries());
// but if we spread it, we will be able to see individual elements, each element is an array of 2 values, first is the index and the second is the value itself.
console.log(...letters.entries());
// output: Array [ 0, "a" ] Array [ 1, "b" ] Array [ 2, "c" ]

// We can make use of these and loop through the array
// Here item will be that indiviual 2 element array
for (const item of menu.entries()) {
  console.log(item[0], item[1]);
}

// But a better way would be to spread the item and make use of the individual variables
for (const [index, value] of menu.entries()) {
  console.log(index, value);
}

// Making it look more like a menu
for (const [index, value] of menu.entries()) {
  console.log(`${index + 1}) ${value}`);
}
*/

/*
// ENHANCED OBJECT LITERALS
// ES6 introduced 3 ways to write object literals in a better way.

const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  orderDelivery: function (obj) {
    console.log(obj);
  },

  // Lets say restaurant object does not have the openingHours property (which in this case also happens to be an object) and we want to include it. The old way to do it would be this:
  // openingHours: openingHours,

  // But since ES6 we can simply do this:
  openingHours,

  // Also for methods, we dont have to define the function in the old way
  // order: function (starterIndex, mainIndex) {
  //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  // },

  // we can do this
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

//We can also compute the property names instead of literally writing it out

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const timings = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [`day-${4 + 2}`]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

console.log(timings.thu); // { open: 12, close: 22 }

*/

/*
// OPTIONAL CHAINING

// restaurant.openingHours.mon.open; // error (because openingHours does not have a property called mon)

// In many practical situations we would have no idea whether an object would have a certain property or not, especially when we receive data from an API
// So instead of getting an error, we can use optional chaining to check whether an object has a property or not.

// Here the optional chaining operator ?. checks whether a property exists in an object, and if it doesn't then it will immediately return undefined and stop further evaluation
// restaurant.openingHours.mon?.open;
// console.log(restaurant.openingHours.mon.open); // error (restaurant.openingHours.mon is undefined because and undefined.open will cause an error)
console.log(restaurant.openingHours.mon?.open); // undefined because 'mon' does not exist and the optional chaining operator will immediately return the undefined value and prevent further evaluation which would have led to an error

console.log(restaurant.openingHours.fri?.open); // 11

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  // console.log(restaurant.openingHours[day]);
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  // console.log(open);
  if (open === 'closed') {
    console.log(`No information for ${day}`);
  } else {
    console.log(`Opens at ${open} on ${day}`);
  }
}

// We can also use the optional chaining to check if a method exists in an object, before calling it

console.log(restaurant.order?.(1, 2) ?? `Method does not exist`); //[ "Bruschetta", "Risotto" ]
console.log(restaurant.foo?.(1, 2) ?? `Method does not exist`); // Method does not exist

// Optional chaining even works on arrays
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
// const users = [];
console.log(users[0]?.name ?? `not available`); //Jonas
console.log(users[0]?.age ?? `user not available`); // 'user not available'
*/

/*
// LOOPING OBJECTS: Object Keys, Values and Entries

console.log(Object.keys(restaurant));
for (const item of Object.keys(restaurant)) {
  console.log(item);
}

console.log(Object.values(restaurant));
for (const item of Object.values(restaurant)) {
  console.log(item);
}

console.log(Object.entries(restaurant));
for (const item of Object.entries(restaurant)) {
  console.log(item);
}
*/

/*
// CODING CHALLENGE #2
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const scores = game.scored;

for (const [goalNum, player] of scores.entries()) {
  console.log(`Goal ${goalNum + 1}: ${player}`);
}

const allOdds = Object.values(game.odds);
let oddsAvg = 0;
for (const odd of Object.values(game.odds)) {
  oddsAvg += odd;
}
console.log(oddsAvg / allOdds.length);

for (const [key, odd] of Object.entries(game.odds)) {
  // console.log(key, odd);
  const str = key === 'x' ? 'draw' : `victory ${game[key]}`;
  // console.log(str);
  console.log(`Odds of ${str}: ${odd}`);
}

const scorers = {};

for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
const scorers = {};

for (const player of game.scored) {
  if (scorers[player]) {
    scorers[player]++;
  } else {
    scorers[player] = 1;
  }
}
*/

/*
const names = [
  'foo',
  'bar',
  'foo',
  'foo',
  'foo',
  'foo',
  'foo',
  'bar',
  'bar',
  'bar',
  'bar',
  'bar',
  'bar',
  'foo',
  'foo',
  'bar',
  'foo',
  'foo',
  'bar',
  'foo',
  'foo',
  'bar',
  'bar',
];
const test = {
  foo: 1,
};

for (const item of names) {
  test[item] ? test[item]++ : (test[item] = 1);
}

console.log(test);

// SETS
//ES6 introduced two more data structures - Sets and Maps

// A set is a collection of UNIQUE values. A set can never have any duplicates.
// It can hold different data types and the order of the elements in the set is irrelevent. Therefore there are no indexes in sets, like we have in arrays

const nums = [1, 2, 1, 2, 1, 2, 3, 1, 2, 4, 1, 2, 6, 3, 4, 5, 6];
const uniqueNums = new Set(nums); // [ 1, 2, 3, 4, 6, 5 ]

const orderSet = new Set([
  'pasta',
  'pizza',
  'pizza',
  'risotto',
  'pasta',
  'pizza',
]);
console.log(orderSet);

// Sets are also iterable
console.log(new Set('Gautam')); //[ "G", "a", "u", "t", "m" ]

// We can get the size of a set using the size method, similar to length method we use on an array
console.log(orderSet.size); //3

// We can check if a certain element is in a set using the has method (similar to the 'includes' array method), which return a boolean value
console.log(orderSet.has('lasagna')); // false
console.log(orderSet.has('pizza')); //true

// We can add a new element to a set using the add method
orderSet.add('garlic bread');
orderSet.add('garlic bread');
orderSet.add('garlic bread');
console.log(orderSet); // [ "pasta", "pizza", "risotto", "garlic bread" ]

// We can delete elements from a set, and from anywhere we want by just specifying the element
orderSet.delete('risotto');
console.log(orderSet); // [ "pasta", "pizza", "garlic bread" ]

// Sets are meant for having a collection of unique, unindexed elements. Therefore if they are unique and their order does not matter, then there is no point in retrieving values out of a set. All we need to know is whether there is a certain element or not, add an element to that collection or remove an element if we dont need it.

// We can use the clear method to remove all the elements of a set
// orderSet.clear();
// console.log(orderSet); // []

//Since Sets are iterable we can run loops through them in the order of insertion (the order in which each element was inserted in the set)
for (const order of orderSet) {
  console.log(order);
}

// Removing duplicates from an array using sets
const staff = ['waiter', 'chef', 'waiter', 'manager', 'chef', 'waiter'];

// since spread operator works on any iterable, we can use it on sets too. Here we are creating a new set out of the array 'staff' and spreading the values inside an array which will be our final array containing unique values
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

// If we simply wanted to know the number of unique elements of an array without creating an array of unique elements, then we could this, with the help of size method:

const staffPositions = new Set([
  'waiter',
  'chef',
  'waiter',
  'manager',
  'chef',
  'waiter',
]).size;
console.log(staffPositions); //3

console.log(new Set('gautammohite').size); // 5
console.log(new Set(' gautam mohite  ').size); // 6 - single space counted only once

// the keys() and values() methods both mean the same thing when it comes to a set because each element is unique in a set and it can be considered as a key

// The entries() method returns a new set iterator object that contains an array of [value, value] for each element in the Set object, in insertion order. For Set objects there is no key like in Map objects. However, to keep the API similar to the Map object, each entry has the same value for its key and value here, so that an array [value, value] is returned.
console.log(uniqueNums.entries());
*/

/*
// MAPS
// A map is a data structure that we can use to map values to keys. Therefore data is stored in key value pairs. In objects the keys(properties) are always strings but in maps the keys can be of any data type (like objects, arrays, booleans, numbers or even other maps)

// The best way to create a map is to first create an empty map and then to fill up the map. We can use the set method which takes a key and a value as parameters
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');

// The set method not only updates the map by adding new key-value pair, but also returns the entire updated map
console.log(rest.set(2, 'Lisbon, Portugal'));

// Since the set method returns the entire map, we can then chain another set method to it and thus set many key-value pairs at once
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

// We can read data from a map using the get method and specify the key
const restName = rest.get('name');

console.log(restName); // Classico Italiano

console.log(rest.get(2)); // Lisbon, Portugal
console.log(rest.get(true)); // We are open :D

/* =======================================================
The data type of the key matters, therefore if we do
const restName = rest.get(name); // undefined (no single quotes for the characters) 
const restName = rest.get('name');  // 'Classico Italiano'

========================================================= */
/*
const currentTime = 21;
console.log(
  rest.get(currentTime > rest.get('open') && currentTime < rest.get('close'))
);

// We can check if a map has a certain key by using the has method
console.log(rest.has('categories')); // true
console.log(rest.has(3)); // false

// We can delete elements from a map by using the delete method and specifying the key
rest.delete(2);
console.log(rest);

//We can find out how many key-value pairs a map has using the size method
console.log(rest.size); //7

// We can delete all the elements from a map using the clear method
// rest.clear();

// Setting arrays and objects as map keys
const arr = [1, 2];
rest.set(arr, 'test');

console.log(rest.get(arr));

// Using arrays as map keys are helpful for DOM elements
rest.set(
  document.querySelector('h1'),
  document.querySelector('h1').textContent
);

// MAPS: ITERATION
// Other than using the set method to populate a map, we iteratively populate a map, especially when we have a lot of values to set. It basically takes an array which hold several arrays, each containing the key-value pairs, quite similar when we do Object.entries() on arrays

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct! 🎉'],
  [false, 'Try again!'],
]);

// Convert object to map, since if we do Object.entries() on an array, it generates an array of smaller arrays with key-value pairs
const hoursMap = new Map([Object.entries(restaurant.openingHours)]);
console.log(hoursMap);

// Maps are iterable
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(key, value);
  }
}

// const answer = Number(prompt(`Enter your answer: `));
const answer = 3;
console.log(question.get(answer === question.get('correct')));

// Convert map to an array (an array containing arrays of key-value pairs)
console.log([...question]);

// Just like objects we can also get the keys, values and entries
console.log([...question.keys()]);
console.log(...question.entries());
*/

/*
// CODING CHALLENGE #3
const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

const events = new Set(...[gameEvents.values()]);
console.log(events);

gameEvents.delete(64);

const meta = [...gameEvents.keys()];
// const gameLength = meta[meta.length - 1];
const gameLength = meta.pop();
// console.log(gameLength);

const str = `An event happened, on average, every ${
  gameLength / gameEvents.size
}  minutes`;
console.log(str);

for (const [timeStamp, whatHappened] of [...gameEvents.entries()]) {
  const half = timeStamp < 45 ? 'FIRST' : 'SECOND';
  console.log(`${half} half: ${timeStamp}: ${whatHappened}`);
}
*/

/*
// WORKING WITH STRINGS
const airline = 'TAP Air Portugal';
const plane = 'A320';

// Since strings are iterables, we can get a specific character of a string based on its position
console.log(plane[0]); // 'A'
console.log(plane[1]); // '3'
console.log(plane[2]); // '2'
console.log(Number(plane[3])); // 0
console.log('B737'[0]); // 'B'

// We can also use the length property on strings, just like we can in arrays

console.log(airline.length); //16
console.log('B737'.length); // 4

// String Methods

// indexOf will return the index of the first occurance of a string/character(case-sensitive). If not found, it will return -1
console.log(airline.indexOf('P')); // 2
console.log(airline.indexOf('Port')); // 8
console.log(airline.indexOf('port')); // -1 (not found)

// We can also use lastIndexOf to get the last occurance of a string (case-sensitive)
console.log(airline.lastIndexOf('P')); //8

// WE can extract parts of a string using the slice method

console.log(airline.slice(4)); // 'Air Portugal'
console.log(airline.slice(4, 7)); // 'Air'

console.log(airline.slice(0, airline.indexOf(' '))); // 'TAP'
console.log(airline.slice(0, airline.lastIndexOf(' '))); // 'TAP Air'
console.log(airline.slice(airline.lastIndexOf(' '))); // ' Portugal'
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // 'Portugal'

console.log(airline.slice(-2)); // 'al'
console.log(airline.slice(1, -1)); // 'AP Air Portuga'

// Example: Function that takes an airplane seat number and returns string saying whether its a middle seat (row B and row E are middle row seats)

const checkMiddleSeat = function (seat) {
  seat.slice(-1) === 'B' || seat.slice(-1) === 'E'
    ? console.log(`You got the middle seat :(`)
    : console.log(`You got lucky :)`);
};

checkMiddleSeat('22B');
checkMiddleSeat('45C');
checkMiddleSeat('12E');
checkMiddleSeat('1A');

// Strings are primitives (not objects) but we can still use methods on them, thats because whenever we call these string methods and properties, behind the scenes JS will convert the string primitive to a string object, and on that object the methods are executed. When the operation is completed, the object is converted back to a regular string. This process is called boxing. ALL STRING METHODS RETURN PRIMITIVES

console.log(new String('jonas')); // String { "jonas" }  <-- string object
console.log(typeof new String('jonas')); // object
console.log(typeof new String('jonas').slice(1)); // string

// Changing the case
console.log(airline.toLowerCase()); // 'tap air portugal'
const passenger = 'gaUtAM';
const passengerCorrect =
  passenger[0].toUpperCase() + passenger.slice(1).toLowerCase();
console.log(passengerCorrect);

// Checking a user input email (Comparing emails)
// trim method gets rid of all the white spaces at the beginning and ending of a string
// There's also trimStart and trimEnd to get remove beginning only and ending only whitspaces respectively
const email = 'hello@jonas.io';
const loginEmail = '   Hello@Jonas.Io \n';
const correctedEmail = loginEmail.toLowerCase().trim();
console.log(email === correctedEmail ? `y` : `n`);

// Replacing
// The replace method replaces the first occurance of a substring/character in a string
const priceGB = '288,97£';
const adjusted = priceGB.replace('£', '$').replace(',', '.');
const conversionRate = Number(adjusted.slice(0, adjusted.indexOf('$'))) * 1.25;
const priceUS =
  String(Math.floor(conversionRate * 100) / 100) + `${adjusted.slice(-1)}`;
console.log(`${priceUS}`); // '361.21$'
// console.log('gautam'.slice(indexOf('a')));

const announcement = `All passengers come to boarding door 23, boarding door 23!`;

// To replace all we can use regex like so:
console.log(announcement.replace(/door/g, 'gate'));
// or we can use the newly added replaceAll method
console.log(announcement.replaceAll('door', 'gate'));

// Booleans - includes, startsWith, endsWith
const newPlane = 'Airbus A320neo';
console.log(newPlane.includes('320')); // true
console.log(newPlane.endsWith('neo')); // true
console.log(newPlane.startsWith('Air')); // true
console.log(newPlane.startsWith('Arb')); // false

// THe split method allows us to split a string into multiple parts based on a divider string and returns an array of the split substrings
console.log('a+very+nice+string'.split('+')); // [ "a", "very", "nice", "string" ]
console.log('Gautam Mohite'.split(' ')); // [ "Gautam", "Mohite" ]

const [firstName, lastName] = 'Gautam Mohite'.split(' ');

// the join method does the opposite of split, it takes an array consisting of string and joins them together along with a separator string which we can specify
const formalName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(formalName); // Mr. Gautam Mohite

const passenger2 = 'jessica ann smith davis';

const capitaliseName = function (name) {
  // console.log(name);
  const splitName = name.split(' ');
  console.log(splitName);
  const correctedName = [];
  for (const n of splitName) {
    correctedName.push(n[0].toUpperCase() + n.slice(1));
  }
  const capitalized = correctedName.join(' ');
  console.log(capitalized);
  return capitalized;
};

capitaliseName('gautam mohite');
capitaliseName(passenger2);

const x = capitaliseName('g c m');
console.log(x.padStart(30, '+'));
console.log(x.padEnd(30, '+'));
console.log(x.padStart(30, '+').padEnd(20, '+'));

const a = 'jonas'.padStart(25, '+');
console.log(a.padEnd(15, '+'));
*/

/*
// CODING CHALLENGE #4

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  let inputString = document.querySelector('textarea').value;
  // console.log(text);

  const textRows = inputString.split('\n');

  // console.log(textRows);

  const boxOutput = [];

  for (const [i, row] of textRows.entries()) {
    const [first, second = ' '] = row.trim().toLowerCase().split('_');

    const result = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    boxOutput.push(result);
    const output = `${result.padEnd(25)}${'✅'.repeat(i + 1)}`;
    console.log(output);
    // boxOutput.length === textRows.length && console.log(boxOutput);
    // document.querySelector('textarea').value = output;
    if (boxOutput.length === textRows.length) {
      document.querySelector('textarea').value = boxOutput.join('\n');
    }
  }
});
*/

/*
// String Methods Practice
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30+_Delayed_Departure;blr93766109;ixg2133758440;1:10';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//_Delayed_Departure;fao93766109;txl2133758440;11:25
const flightInfo = flights.split('+');

const createCode = inputThread => {
  return inputThread.slice(0, 3).toUpperCase();
};
// console.log(flightInfo);

for (const item of flightInfo) {
  let [status, source, destination, duration] = item.split(';');
  status = status.replaceAll('_', ' ').trim();
  status.toLowerCase().includes('delayed') ? (status = '🔴 ' + status) : status;
  source = `from ${createCode(source)}`;
  destination = `to ${createCode(destination)}`;
  duration = duration.replace(':', 'h');

  console.log(`${status} ${source} ${destination} (${duration})`.padStart(50));
}

*/
