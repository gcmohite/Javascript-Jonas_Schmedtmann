// shoppingCart.js is the exporting module
console.log(`Exporting module`);

// Blocking code (to demonstrate top-level await)
// This will make the code execution in in the importing module (script.js) to halt until the below async operation is completed.
// console.log(`fetching users...`);
// const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
// console.log(`finished fetching`);

const shippingCost = 10;
export const cart = [];

// named export
// Exports always need to happen in top-level code, exporting this function if it were inside some block wouldn't have worked
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart.`);
};

const totalPrice = 237;
const totalQuantity = 23;

// Exporting multiple values
// export { totalPrice, totalQuantity };

// We can change the name of the export
export { totalPrice, totalQuantity as tq };

// Default export
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart.`);
}
