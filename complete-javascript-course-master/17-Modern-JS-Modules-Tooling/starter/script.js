// script.js is the importing module
console.log(`Importing module`);

// named import
// import { addToCart } from './shoppingCart.js';
// import { totalPrice, totalQuantity } from './shoppingCart.js';

// importing all in one import statement
// import { addToCart, totalPrice, totalQuantity } from './shoppingCart.js';

//We can change the name of the imports
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';

// addToCart('bread', 5);
// console.log(price, tq);

// Importing everything as once
import * as ShoppingCart from './shoppingCart.js';

console.log(ShoppingCart);
console.log(ShoppingCart.totalPrice);
console.log(ShoppingCart.tq);
// ShoppingCart.addToCart('bread', 5);

// Default import
import add from './shoppingCart.js';

// Mixing default and named imports (We can do it but its not best practice to mix default and named exports, so avoid)
// import add, { addToCart, totalPrice, totalQuantity } from './shoppingCart.js';

// Live-connection between imports and exports
import { cart } from './shoppingCart.js';
add('icecream', 10);
add('pizza', 4);
add('biryani', 5);

// 'cart' array in the imported module 'shoppingCart.js' gets updated
console.log(cart);

/*
// TOP-LEVEL AWAIT IN MODULES
// Note: Using top-level await will block the execution until the asynchronous operation is completed. So we must be careful to use top-level await.

// console.log(`fetching...`);
// const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
// const data = await response.json();
// console.log(data);
// console.log(`done`);

const getLastPost = async function () {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await response.json();
  // console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};

// const lastPost = getLastPost();
// console.log(lastPost);

// Not very clean
// lastPost.then(last => console.log(last));

const lastPost2 = await getLastPost();
console.log(lastPost2);
*/

/*
// MODULE PATTERN
// in regular modules that we just learned about, the main goal of the module pattern is to encapsulate functionality, to have private data, and to expose a public API. And the best way of achieving all that is by simply using a function, because functions give us private data by default and allow us to return values, which can become our public API.

// For implementing this we use an IIFE, which will execute only once and we can make the IIFE return some values(public API), which can be stored in a variable. In this case we are making the IIFE return an object, which contains a variety of values, like an array and numbers and also some functions. And we can later use these functions stored in the variable (which is an object) because of closure. Those functions will still be able to access the variables in the lexical scope of the birth of those functions, thanks to closure.

const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to the cart. (Shipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return { addToCart, cart, totalPrice, totalQuantity };
})();

console.log(ShoppingCart2);
ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 4);

console.log(ShoppingCart2.cart);
*/

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

import cloneDeep from 'lodash-es';

const state = {
  cart: [
    {
      product: 'bread',
      quantity: 5,
    },
    {
      product: 'pizza',
      quantity: 5,
    },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;

console.log(stateClone);
console.log(stateDeepClone);

// Hot module replacement
if (module.hot) {
  module.hot.accept();
}

class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');

console.log(`Jonas` ?? null);

console.log(cart.find(el => el.quantity == 10));

Promise.resolve('TEST').then(x => console.log(x));

import 'core-js/stable';
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// Polyfilling async functions
import 'regenerator-runtime/runtime.js';
