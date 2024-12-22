'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// Writing a function to get country data using the API
const getCountryData = function (country) {
  const request = new XMLHttpRequest();

  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [country] = JSON.parse(this.responseText);

    const html = `<article class="country">
      <img class="country__img" src="${country.flags.svg}" />
      <div class="country__data">
      <h3 class="country__name">${country.name.common}</h3>
      <h4 class="country__region">${country.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +country.population / 1000000
      ).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${Object.values(
        country.languages
      ).join(', ')}</p>
      <p class="country__row"><span>💰</span>${
        Object.values(country.currencies)[0].name
      }</p>
      </div>
      </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

// getCountryData('india');
// getCountryData('germany');
// getCountryData('usa');

const renderCountry = function (country, className = '') {
  const html = `<article class="country ${className}">
  <img class="country__img" src="${country.flags.svg}" />
  <div class="country__data">
    <h3 class="country__name">${country.name.common}</h3>
    <h4 class="country__region">${country.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +country.population / 1000000
    ).toFixed(1)}M people</p>
    <p class="country__row"><span>🗣️</span>${Object.values(
      country.languages
    ).join(', ')}</p>
    <p class="country__row"><span>💰</span>${
      Object.values(country.currencies)[0].name
    }</p>
  </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

////////////////////////////////////////////////////////////////

/*
const body = document.querySelector('body');
const p = document.createElement('p');
body.insertAdjacentElement('afterbegin', p);
p.textContent = 'Hello';
p.style.fontSize = '40px';
p.style.position = 'absolute';
p.style.top = '2rem';
p.style.color = 'blue';
console.log(p.style.color);

// will block further execution until the alert is cleared
alert('Text set');
p.style.color = 'red';
console.log(p.style.color);

// asynchronous execution
p.textContent = 'Hello World';
// will be executed asynchronously (setTimeOut is asynchronous) i.e the lines of code after this timer will not wait for execution
setTimeout(() => {
  console.log('text color changed');
  p.style.color = 'teal';
}, 5000);

p.style.color = 'red'; // will be executed before the timer

// However, CALLBACK FUNCTIONS ALONE DO NOT MAKE CODE ASYNCHRONOUS
*/

// const lotteryPromise1 = new Promise(function (resolve, reject) {
//   if (Math.random() >= 0.5) {
//     resolve(`You win 💰`);
//   } else {
//     reject(`You lose 😭`);
//   }
// });

// Another asynchronous execution example

/*
const body = document.querySelector('body');
const img = document.createElement('img');
body.insertAdjacentElement('afterbegin', img);

//setting the src attribute is asynchronous, which makes sense because large images may take time to load and its not performant to wait till the image is loaded. Once the image is loaded, a 'load' event is emitted, which we can listen to. Note that for setting the src attribute, no callback function is used, but it is still an asynchronous piece of code.
img.src = 'img/img-1.jpg';
img.addEventListener('load', function () {
  img.style.width = '600px';
});
*/

// MAKING AN AJAX CALL
// we can make AJAX calls using XMLHttpRequest API or the modern Fetch API along with promises because calling the fetch() method returns a promise. (explained in the Promises section)

// Using XMLHttpRequest API
//To send an HTTP request, create an XMLHttpRequest object, open a URL, and send the request. After the transaction completes, the object will contain useful information such as the response body and the HTTP status of the result. You need to add the event listeners before calling open() on the request. Otherwise the progress events will not fire.

// The web API from which we are getting the data here is the REST countries API and the API endpoint for it is https://restcountries.com/v3.1/name/{name}.
// While using an API we should check the Authentication, HTTPS and CORS (Cross Origin Resource Sharing). Any API which we are using to get data should have the CORS set to 'Yes' or 'Unknown' in its documentation.

const request = new XMLHttpRequest();
// setting up the request
request.open('GET', `https://restcountries.com/v3.1/name/india`);
// sending the request, which will then fetch the data asynchronously and once the data has arrived, a load event is emitted
request.send();

// listening for the load event, and once the event has emitted, it means the data is received. And the JSON data will be available on the responseText property of the received object
request.addEventListener('load', function (e) {
  // console.log(e); // ProgressEvent object

  // console.log(this);
  // console.log(this.status); // 200 if data received, 404 if not found

  // contains the stringified JSON which needs to be converted into a JSON object by parsing the string
  // console.log(this.responseText);

  // parsing the JSON data
  const [data] = JSON.parse(request.responseText);
  console.log(data);
});

//

/*
const getCountryAndNeighbours = function (country) {
  // AJAX call for main country
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    // console.log(this);
    // console.log(this.status);
    // console.log(this.responseText);
    const [country] = JSON.parse(this.responseText);

    console.log(country);

    renderCountry(country);

    // Get the neighbours
    const neighbours = country.borders;
    console.log(neighbours.length);

    if (!neighbours) return;

    // AJAX call for 1st neighbour - based on country code
    neighbours.forEach(nei => {
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.com/v3.1/alpha/${nei}`);
      request2.send();

      request2.addEventListener('load', function () {
        const [country] = JSON.parse(this.responseText).splice(-1);

        renderCountry(country, 'neighbour');
      });
    });
  });
};

// getCountryAndNeighbours('india');

//  In the above code the HTTP request for the neighbouring countries depends on the data we get from the HTTP request of the main country. We have nested the callback of one HTTP request within another, and if we wanted, we can nest even further for our purposes. However this nesting of callbacks within callbacks is prone to bugs and not very readable and clean. We call this as CALLBACK HELL. We must avoid this and we can escape callback hell by using Promises.
*/

/*
// Another example of callback hell
setTimeout(() => {
  console.log(`1 second passed`);
  setTimeout(() => {
    console.log(`2 seconds passed`);
    setTimeout(() => {
      console.log(`3 seconds passed`);
      setTimeout(() => {
        console.log(`4 seconds passed`);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

/*
// PROMISES AND THE FETCH API

// The modern way of making AJAX calls is by using the Fetch API.
// The fetch() method takes one mandatory argument, the path to the resource you want to fetch and an optional 'init' object of various options, that allows you to control a number of different settings. It returns a Promise object.

// CONSUMING PROMISES
// To handle a fulfilled promise, we use the then() method available on all Promises. Into the then() method, we need to pass a callback function that we want to be executed as soon as the promise is fulfilled. The then() method receives a Response object as argument, which is the result of the fulfilled promise (in the below case, the data we receive from the HTTP request to the API, which we have named as 'response'). However we cannot yet access the received data, and first we need to call json() method available on the Response object to convert the received JSON data into a JS object. However, calling the json() method is also an asynchronous function and it too will return a promise and we need to handle that promise with another then() method in order to eventually read the received data.

// NOTE: The then() method always returns a promise, even if we do not explicitly return anything in the method. But if we do return a value explicitly, then that value will become the fulfillment value of the returned promise of the then() method. In the below code, in the first then() method we are explicitly returning the result of calling json() method on the received Response object. The json() method also returns a promise, so in this case we end up returning a promise but that promise is not the default promise returned by the then() operation.

const getCountryData2 = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      console.log(response); // the Response object
      return response.json();
    })
    .then(function (data) {
      console.log(data.at(0));
      // renderCountry(data.at(0));
    });
  // console.log(request);
};

getCountryData2('india');

// writing the above in a more concise way
// const getCountryDataArrow = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then(data => renderCountry(data.at(0)));
// };
// getCountryDataArrow('india');


const getCountryDataFoo = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      return 44;
    })
    .then(data => console.log(data));
};
// getCountryDataFoo('india');
*/

/*
// CHAINING PROMISES
// Here we are chaining promises together so that the data from the first HTTP request can be used to make another HTTP request. In this case we will get the data of the neighbour country from the first country. This is better than nesting callback within callbacks.

const getCountryData3 = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      const country = data.at(0);
      renderCountry(country);
      const neighbours = country.borders;
      console.log(neighbours);
      const neighbour = country.borders?.[0];
      console.log(neighbour);
      if (!neighbour) return;
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => {
      renderCountry(...data, 'neighbour');
    });
};
getCountryData3('india');
*/

/*
//HANDLING REJECTED PROMISES
// Rejected Promises can be handled in two ways, either by passing a second callback function in the then() method or by chaining a catch() method at the end which will handle all the rejected promises in the chain.

// The finally() method is a method which will always be called, whether the promise is fulfilled or rejected. We can use it to set some default action that we want to take regardless of the promise state.

// NOTE: just like the then() method, the catch() method will also return a promise by default, (hence in the below code, we were able to chain the finally() method to the catch() method)

const getCountryData4 = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      const country = data.at(0);
      renderCountry(country);
      const neighbour = country.borders?.[0];
      if (!neighbour) return;
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => {
      renderCountry(...data, 'neighbour');
    })
    .catch(err => {
      // console.table(err);
      console.error(`${err} 😭😭😭`);
      renderError(`Something went wrong 😭😭😭 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData4('india');
});
// getCountryData4('india');
// getCountryData4('fsdfsdf');
*/

/*
// THROWING ERRORS MANUALLY
// In the previous code if we call getCountryData4 with some random string or with some country which does not exist, the API HTTP response will be 404. This is not a rejected promise, there was no error in connection, its just that, that kind of data is not available in the API. Hence the promise is still fulfilled in the first fetch request above, its just that it will log a 404 error in the console, but the second fetch request will result in a rejected promise since we're requesting based on the first request, whose data is not even available.

// Hence we are now manually setting an error message for the 404 by using 'throw' statement and the Error constructor function. The throw statement throws a user-defined exception. Execution of the current function will stop (the statements after throw won't be executed), and control will be passed to the first catch block in the call stack (which means that the promise is immediately rejected). If no catch block exists among caller functions, the program will terminate.

const getCountryData5 = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      console.log(response);

      if (!response.ok)
        throw new Error(`Country not found! ${response.status}`);
      return response.json();
    })
    .then(data => {
      const country = data.at(-1);
      renderCountry(country);
      const neighbour = country.borders?.[0];
      // const neighbour = '';

      if (!neighbour) return;
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`No neighbouring country found! ${response.status}`);
      return response.json();
    })
    .then(data => {
      renderCountry(...data, 'neighbour');
    })
    .catch(err => {
      // console.table(err);
      console.error(`${err} 😭😭😭`);
      renderError(`Something went wrong 😭😭😭 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', function () {
//   getCountryData5('india');
// });
getCountryData5('portugal');
*/

/*
// CREATING HELPER FUNCTION FOR FETCHING AND ERROR HANDLING

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};
const getCountryData6 = function (country) {
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country not found!'
  )
    .then(data => {
      // console.log(data.at(0).name.common);
      const [country] = data;
      renderCountry(country);
      const neighbour = country.borders?.[0];

      if (!neighbour) {
        throw new Error(
          `No neighbouring countries for ${data.at(0).name.common}`
        );
      }
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Neighbour not found'
      );
    })
    .then(data => {
      renderCountry(...data, 'neighbour');
    })
    .catch(err => {
      console.error(`${err} 😭😭😭`);
      renderError(`Something went wrong 😭😭😭 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', function () {
//   getCountryData6('india');
// });
// getCountryData6('wakanda');
*/

/*
//CODING CHALLENGE #1

const whereAmI = function (lat, lng) {
  let country = '';
  let city = '';

  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=89d2928e116048bd899b3aa460df4f5e`
  )
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(data);
      country = data.features.at(0).properties.country;
      city = data.features.at(0).properties.city;
      // console.log(`You are in ${city}, ${country}`);
      // getCountryData6(country);
      // getCountryData6('australia');

      return fetch(`https://restcountries.com/v3.1/name/${country}`);
    })
    .then(response => {
      if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      renderCountry(...data);
    })
    .catch(error => console.log('error', error))
    .finally((countriesContainer.style.opacity = 1));
};

// whereAmI(52.508, 13.381); // Berlin
// whereAmI(19.037, 72.873); // Mumbai
// whereAmI(-33.933, 18.474); // Cape Town
// whereAmI(15.885533, 74.5111716); // Belgaum

// 15.885533,74.5111716
// 19.037, 72.873
// -33.933, 18.474
*/
/*
// EVENT LOOP IN PRACTICE
console.log(`Test start`); // 1 -- top level code
setTimeout(() => console.log(`0 sec timer`), 0); // 5
Promise.resolve('Resolved promise 1').then(res => console.log(res)); // 3
Promise.resolve('Resolved promise 2').then(res => {
  // 4
  for (let i = 0; i < 10000000000; i++) {
    continue;
  }
  console.log(res);
});
console.log(`Test end`); // 2 -- top level code
*/

/*
// BUILDING A SIMPLE PROMISE
// We can create a new promise using a Promise constructor. The Promise constructor takes exactly one 'executor' function as argument. The executor function will contain the asynchronous behaviour that we are trying to handle with the promise. So this executor function should eventually produce a result value that's basically going to be the future value of the promise.
// As soon as the Promise constructor runs, it will run the executor function by passing to it two arguments, which are the 'resolve' and 'reject' functions and one of them is executed depending on whether the promise is fulfilled or rejected (we can name them anything, we just named them as resolve and reject and its a convention to name them so). In the resolve method we can have the fulfilled value of the promise, which can be used later by the then() method. Similarly in the reject method we can have the reject value, which can be used later by the catch() method.


// Note: the 'resolve' and 'reject' arguments are implicitly passed and we dont need a return statement to pass the fulfilled value in each case, just like for e.g the map() method takes in the value, index and array implicitly. Hence we can make use of resolve and reject or not use them at all, they are optional.

// const lotteryPromise1 = new Promise(function (resolve, reject) {
//   if (Math.random() >= 0.5) {
//     resolve(`You win 💰`);
//   } else {
//     reject(`You lose 😭`);
//   }
// });

const lotteryPromise2 = new Promise(function (resolve, reject) {
  console.log(`Lottery draw in progress`);
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error(`You LOSE 😭`));
    }
  }, 1000);
});

// console.log(lotteryPromise2);

// Consuming the promise
// lotteryPromise2.then(res => console.log(res)).catch(err => console.error(err));

// In practice, most of the times we consume promises and usually we build promises to wrap old callback based functions into promises. This process is called promisifying, where we convert callback based asynchronous behaviour to promise based. Its usually done by creating a function and making that function return a promise. (Just like the Fetch() API)
*/

/*
// Promisifying a setTimeout function to a wait function.
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve(seconds), seconds * 1000);
//   });
// };

// wait(2)
//   .then(res => {
//     console.log(`waited for ${res} seconds`);
//     return wait(1);
//   })
//   .then(res => console.log(`waited for ${res} seconds`));

// In the above function we dont need the reject parameter because the timer will always finish execution and never fail

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log(`1 seconds passed`);
    return wait(1);
  })
  .then(() => {
    console.log(`2 seconds passed`);
    return wait(1);
  })
  .then(() => {
    console.log(`3 seconds passed`);
    return wait(1);
  })
  .then(() => {
    console.log(`4 seconds passed`);
    return wait(1);
  });
*/

/*
  // Creating a fulfilled or rejected promise immediately.
// The promise object has static built-in resolve and reject methods which can be used to immediately return a fulfilled or rejected promise.

console.log(new Promise(function () {})); // check the constructor

Promise.resolve('Fulfilled promise ✅').then(x => console.log(x));
Promise.reject(new Error(`rejected promise 💩`)).catch(err =>
  console.error(err)
);
*/

/*
// PROMISIFYING GEOLOCATION API
// Geolocation API is callback based, so we can promisify its callback based asynchronous behaviour to Promise based behaviour 
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.log(err)
// );
console.log(`Getting Position`);

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   success => resolve(success),
    //   error => reject(error)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition()
  .then(pos => {
    // console.log(pos);
    const { latitude: lat, longitude: lng } = pos.coords;
    console.log(lat, lng);
  })
  .catch(err => console.error(err));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      // console.log(lat, lng);
      return fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=89d2928e116048bd899b3aa460df4f5e`
      );
    })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(data);
      const country = data.features.at(0).properties.country;
      const city = data.features.at(0).properties.city;
      console.log(`You are in ${city}, ${country}`);
      // getCountryData6(country);
      // getCountryData6('australia');

      return fetch(`https://restcountries.com/v3.1/name/${country}`);
    })
    .then(response => {
      if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      renderCountry(...data);
    })
    .catch(error => console.log('error', error))
    .finally((countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', whereAmI);
*/

/*
// CODING CHALLENGE #2

// helper function for pausing execution for 2sec
const wait2sec = function () {
  return new Promise(function (resolve) {
    setTimeout(resolve, 2000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (response, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      imgContainer.append(img);
      response(img);
    });
    img.addEventListener('error', function () {
      reject(new Error(`image could not be loaded 😭`));
    });
  });
};

let currentImage;

createImage('img/img-1.jpg')
  .then(img => {
    currentImage = img;
    return wait2sec();
  })
  .then(() => {
    currentImage.style.display = 'none';
    console.log(`image 1 hidden`);
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImage = img;
    return wait2sec();
  })
  .then(() => {
    currentImage.style.display = 'none';
    console.log(`image 2 hidden`);
  })
  .catch(err => console.error(err));
*/

/*
// Just trying some things

const promiseTimer = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve(`${seconds} seconds waited`);
    }, seconds * 1000);
  });
};

// promiseTimer(2).then(res => console.log(res));

const asyncTimer = async function (seconds) {
  console.log(`timer set for ${seconds} seconds...`);
  const str = await new Promise(function (resolve) {
    setTimeout(() => {
      resolve(`${seconds}`);
    }, seconds * 1000);
  });
  console.log(`${str} seconds completed. ⏱`);
  return str;
};

// asyncTimer(5);
// console.log(asyncTimer(2));
*/

/*
// ASYNC/AWAIT
// We can consume promises in a better way using Async/Await functions. We start by creating a special type of function called async function like below. An async function will asynchronously run in the background and once it finished executing the function body, it will return a promise(which we will see later). Inside the async function we can have one or more statement with the await' keyword, followed by code which returns a promise. The await keyword halts the function execution until the promise is resolved. And halting the execution is fine because the function is running in the background and not blocking the main thread of execution. As soon as the promise is resolved, the value of the whole await expresssion will be the rsolved value of the promise, which we can of course store in a variable.

// NOTE: async/await is infact just syntactic sugar over the then() method and behind the scenes we are still using promises but simply using a more convenient way of consuming them

const whereAmI = async function (country) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  const data = await res.json();

  const [nation] = data;
  // renderCountry(nation);
  console.log(nation);
};

// whereAmI('india');

// this will run first because the function whereAmI is asynchronous, which means it will be executed in the background till it is completed
console.log(`getting info...`);

// The above async function is exactly same as doing this:
// fetch(`https://restcountries.com/v3.1/name/india`)
//   .then(res => res.json())
//   .then(data => console.log(data));

// recreating the reverse geocoding example
const getPosition2 = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI2 = async function () {
  // Geolocation
  const pos = await getPosition2();

  // Reverse geocoding
  let { latitude: lat, longitude: lng } = pos.coords;
  console.log(lat, lng);

  const resGeo = await fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=89d2928e116048bd899b3aa460df4f5e`
  );

  const dataGeo = await resGeo.json();
  console.log(dataGeo.features);

  const { country, city } = dataGeo.features[0].properties;
  console.log(country);

  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  const data = await res.json();

  console.log(data);
  console.log(`You are in ${city}, ${country}`);
  renderCountry(data[0]);
};

whereAmI2();

// btn.addEventListener('click', whereAmI2);
*/

/*
// ERROR HANDLING WITH try...catch
// The try...catch statement is used in regular Javascript to catch errors but we can also use it to handle errors in async-await
// TIP: Always use try...catch inside an async function

// basic example of try...catch

// try {
//   let x = 1;
//   const y = 2;
//   y = 5;
// } catch (err) {
//   // console.error(err);
//   // console.table(err);
//   // console.log(err);
//   // console.log(err.message);
//   // console.log(`😭${err.message}😭`);
//   // alert(`😭${err.message}😭`);
//   renderError(`😭${err.message}😭`);
// }

// Handling errors in the geolocation function using try...catch
const getPosition3 = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI3 = async function () {
  try {
    // Geolocation
    const pos = await getPosition3();

    // Reverse geocoding
    let { latitude: lat, longitude: lng } = pos.coords;
    // console.log(lat, lng);

    const resGeo = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=89d2928e116048bd899b3aa460df4f5e`
    );

    if (!resGeo.ok) throw new Error(`Problem getting location data ☹`);
    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    const { country, city } = dataGeo.features[0].properties;
    console.log(country);

    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (!res.ok) throw new Error(`Problem getting country ☹`);

    const data = await res.json();

    console.log(data[1]);

    // console.log(`You are in ${city}, ${country}`);
    renderCountry(data[1]);
  } catch (err) {
    console.error(`${err} 😭`);
    renderError(`☹ ${err.message}`);
  }
};

whereAmI3();
*/

/*
// RETURNING VALUES FROM ASYNC FUNCTIONS
// Lets assume the function is a regular function which returns a value, and now lets check the order of execution, and how to get the returned value from an async function.

const getPosition4 = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI4 = async function () {
  try {
    const pos = await getPosition4();

    let { latitude: lat, longitude: lng } = pos.coords;

    const resGeo = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=89d2928e116048bd899b3aa460df4f5e`
    );

    if (!resGeo.ok) throw new Error(`Problem getting location data ☹`);
    const dataGeo = await resGeo.json();

    const { country, city } = dataGeo.features[0].properties;

    //entering an erroneous country name
    // const res = await fetch(
    //   `https://restcountries.com/v3.1/name/${countryddd}`
    // );

    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (!res.ok) throw new Error(`Problem getting country ☹`);

    const data = await res.json();

    // renderCountry(data[1]);

    // returning a value
    // return `You are in ${city}, ${country}`;
    const location = {};
    location.city = city;
    location.country = country;
    return location;
  } catch (err) {
    console.error(`${err} 😭`);
    // console.table(err);
    renderError(`☹ ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

// Lets assume the function is a regular function which returns a value, and now lets check the order of execution. Since async functions always return a promise, we can see that the value of 'city' is a Promise and not the string in the return statement of the async function, which we were expecting. In other words, calling the async function returns a promise.
// Also, the value that we return from an async function will be the fulfilled value of the promise that is returned by the function. [In this case the fulfilled value of the promise is going to be the string `You are in ${city}, ${country}`]
console.log(`1. Getting location...`);
const city = whereAmI4();
// console.log(city); // Promise {<pending>}

// NOTE: Even though there is an error in the try block of the async function, if we use a catch() on the returned promise of the async function, it will not be executed. It is the try() block which will always be executed. Hence to catch the errors we need to re-throw the error from the catch() block of the async function. And then we will be able to access the errors externally using a catch()

// Since calling the function whereAmI4() returns a promise, we can use then() catch() and finally() on it.
// whereAmI4()
//   .then(loc => console.log(`2: ${loc.city}`))
//   .catch(err => console.error(`2: ${err.message} 😭`))
//   .finally(() => console.log(`3. Finished getting location`)); //

// Writing the above as an IIFE because using then, catch, finally on an async function kind of defeats the purpose of using async functions
(async function () {
  try {
    const { city, country } = await whereAmI4();
    console.log(`2. You are in ${city}, ${country}`);
  } catch (err) {
    console.error(`2. ${err} 💩`);
  }
  console.log(`3. completed.`);
})();
*/

/*
// RUNNING PROMISES IN PARALLEL
// const getJSON2 = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
//     return response.json();
//   });
// };

// const get3CountriesAsync = async function (c1, c2, c3) {
//   try {
//     const [data1] = await getJSON2(`https://restcountries.com/v3.1/name/${c1}`);
//     const [data2] = await getJSON2(`https://restcountries.com/v3.1/name/${c2}`);
//     const [data3] = await getJSON2(`https://restcountries.com/v3.1/name/${c3}`);

//     const [capital1] = data1.capital;
//     const [capital2] = data2.capital;
//     const [capital3] = data3.capital;

//     console.log([capital1, capital2, capital3]);
//   } catch (error) {}
// };

// get3CountriesAsync('india', 'germany', 'tanzania');

// USING THE Promise.all() method
// In the above code, we ran the 3 AJAX calls one after another, which means the until the first AJAX call is completed, it will halt the execution of the function, then move on to the next AJAX call which will again halt execution until its completed, and so on. This is not ideal, especially in cases where the result one AJAX call is not dependent on the other (like above).
// However, we can make Promises run in parallel using the Promises.all() combinator function. all() is a static method on the Promise object.
// Promise.all() will take an array of promises and returns a new promise. This returned promise value will be an array containing the fulfilled value of each of the input promises. Promise.all() fulfills when all of the input promises fulfill. If any one of the promises in the array rejects then the whole Promise.all() will also reject.
// Of course, we can use Promise.all() in other ways also like for e.g using a then() method on the returned promise of Promise.all()

const getJSON3 = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};

const get3Countries = async function (c1, c2, c3) {
  let capitals = [];
  try {
    const data = await Promise.all([
      getJSON3(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON3(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON3(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    // .then(d => {
    //   console.log(d);
    //   d.forEach(country => {
    //     capitals.push(country[0].capital);
    //     capitals = capitals.flat();
    //   });
    // });

    console.log(data);
    const capitals = data.flatMap(c => c[0].capital);
    console.log(capitals);
  } catch (err) {
    console.log(err);
  }
};

get3Countries('india', 'germany', 'usa');

// OTHER PROMISE COMBINATORS: race, allSettled, any

// Promise.race()
//Promise.race() also takes an array of promises and returns the first promise which is settled (fulfilled or rejected). We can say that Promise.race() short circuits whenever any of the input promises settles.
// Promise.race() is useful to prevent against never ending promises or promises that are in pending state for a very long time.
const getJSON4 = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};

(async function () {
  const res = await Promise.race([
    getJSON4(`https://restcountries.com/v3.1/name/australia`),
    getJSON4(`https://restcountries.com/v3.1/name/mexico`),
    getJSON4(`https://restcountries.com/v3.1/name/germany`),
  ]);
  console.log(res);
})();

// Few more examples
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`request took too long`));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON4(`https://restcountries.com/v3.1/name/australia`),
  timeout(0.8),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled()
// Promise.allSettled() also takes an array of promises and returns an array of all the settled promises
Promise.allSettled([
  Promise.resolve('success'),
  Promise.reject('ERROR'),
  Promise.resolve('success'),
]).then(res => console.log(res));

// as compared to
Promise.all([
  Promise.resolve('success'),
  Promise.reject('ERROR 💩'),
  Promise.resolve('success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any()
// Promise.any() also takes an array of promises and returns the first fulfilled promise and simply ignore any rejected promises. If all promises are rejected then it will throw system generated error saying that all the promises were rejected even if we dont catch the error using a catch()
Promise.any([
  Promise.reject('ERROR 💩'),
  Promise.resolve('success 🎉'),
  Promise.resolve('success ✅'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

Promise.any([
  Promise.reject('ERROR 😭'),
  Promise.reject('ERROR 💩'),
  Promise.reject('ERROR 😞'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

/////////////////////////////////////////////////////////////////////

// Promise.all() - fulfills when all the promises fulfil, and rejects when ony one of the promises reject

// Promise.race() - settles when the first promise settles. (the first settled promise wins the race). In other words, the fulfilment value will be that of the first promise to fulfil/reject (i.e settle)

// Promise.allSettled() - returns array all the settled promises

// Promise.any() - fulfils when the first promise fulfils. rejects when all promises reject



/////////////////////////////////////////////////////////////////////

// https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=89d2928e116048bd899b3aa460df4f5e

// let lat, lon;
// function init(data) {
//   lat = data.coords.latitude;
//   lon = data.coords.longitude;
//   console.log(lat, lon);
//   return [lat, lon];
// }

// function success(data) {
//   console.log(data);
//   init(data);
// }

// function error() {
//   console.log(`Could not get the location`);
// }

// const pos = navigator.geolocation.getCurrentPosition(success, error);
*/

// CODING CHALLENGE #3
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (response, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      imgContainer.append(img);
      response(img);
    });
    img.addEventListener('error', function () {
      throw new Error(`image could not be loaded 😭`);
    });
  });
};

// let currentImage;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImage = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     console.log(`image 1 hidden`);
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImage = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     console.log(`image 2 hidden`);
//   })
//   .catch(err => console.error(err));

let currentImg;

const loadNPause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');
    console.log(`image 1 loaded`);
    await wait(2);
    img.style.display = 'none';
    console.log(img);

    img = await createImage('img/img-2.jpg');
    console.log(`image 2 loaded`);
    await wait(2);
    img.style.display = 'none';

    console.log(img);
  } catch (error) {
    console.error(error);
  }
};

// loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgPromises = imgArr.map(im => createImage(im)); // my code
    // const imgPromises = imgArr.map(async img => {
    //   await createImage(img);
    // }); // solution code
    console.log(imgPromises);

    const imgs = await Promise.all(imgPromises);

    console.log(imgs);

    imgs.forEach(img => img.classList.add('parallel'));
    console.log(imgs);
  } catch {
    console.error(`😭${error}`);
  }
};

// loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
