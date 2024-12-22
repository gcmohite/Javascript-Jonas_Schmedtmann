'use strict';

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

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

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

// Here we are destructuring the object 'restaurant'. the variable names should exactly match the property names that we want from the object.
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// then if we want, we can give our own names to the properties  (which we first extracted by specifying their exact name).
const {
  //name is the object property and restaurantName is the variable name which we just gave to name
  name: restaurantName,
  openingHours: hours,
  categories: tags,
  location: address,
} = restaurant;

console.log(restaurantName, hours, tags);

// Setting default values
// We can set default values in the destructuring. this is helpful in case we are looking for a property inside the object but its not available. in those cases instead of that variable being undefined, it will have some default value.

//here we are setting default value of variable 'name' to emmpty array, and since there is no property called name in the 'restaurant' object, its value will be set to empty array instead of being undefined. Now 'starterMenu', is a property of 'restaurant' object, so it will ignore the default value and assign the property value (we have then renamed the variable to 'starters')
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables using destructring of objects

let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

// here we are assigning new values to a and b and the values are from obj.
// but when we do {a,b} = obj; we will get an error because JS expects {} to be a code block and we cannot assign anything to a code block. so we get around it by wrapping it all in parentheses
({ a, b } = obj);
console.log(a, b);

// Destructuring with nested objects
// Here we are extracting the 'open' and 'close' properties as variables from the the object 'fri' which is nested within the object 'openingHours'

const {
  openingHours: {
    fri: { open, close },
  },
} = restaurant;
console.log(open, close);
// const {
//   sat: { open, close },
// } = openingHours;

// Many times we have functions which need to take a lot of parameters, and its hard to know  the order of parameters, so instead of defining the parameters manually, we can just pass an object into the function as an argument, and the function can then immediately destructure that object

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
