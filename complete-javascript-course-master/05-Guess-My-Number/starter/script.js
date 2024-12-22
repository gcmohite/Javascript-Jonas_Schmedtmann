'use strict';

// SELECTING AND MANIPULATING ELEMENTS
console.log(document.querySelector('.message').textContent);

/*
// Changing the text content of an element using DOM manipulation
document.querySelector('.message').textContent = 'Correct Number! 🎉';

// Now when we read the element it will display the new text
console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

// Setting the value of an input element
// To read or set the value from an input element we use the value property.
document.querySelector('.guess').value = 23;
// Displaying that value in the console
console.log(document.querySelector('.guess').value);


// ============== ACTUAL GAME LOGIC STARTS HERE ===============================

// Generating a random between 1 and 20, we add +1 because it will generate only from 0 to 19
let secretNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20;
let highscore = 0;

// document.querySelector('.number').textContent = secretNumber;

// CLICK EVENTS (Event listening and event handler)

/*  Here we have added a click event listener on the button which has the class 'check'.
    The event listener will wait for the click on the button element and once clicked it will store the value of the input (with class 'guess) in the variable 'guess' and log it onto the console. For that we have defined a function and that function will be executed i.e called when the button is clicked. Note that we have not called the function anywhere (we only defined it and passed it into the event handler), the Javascript engine will call the function on the click event. Hence that function is a callback function     */
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  // console.log(guess, typeof guess);

  // if there is no input provided
  if (!guess) {
    // document.querySelector('.message').textContent = 'No number! ⛔';
    displayMesssage('No number! ⛔');
  }
  // when guess is correct / player wins
  else if (guess === secretNumber) {
    displayMesssage('Correct!🎉');
    document.querySelector('.number').textContent = secretNumber;
    //change the background color and general text color
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    // setting the new high-score
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // When guesss is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent =
      // guess > secretNumber ? '📈 Too High!' : '📉 Too Low!';
      displayMesssage(guess > secretNumber ? '📈 Too High!' : '📉 Too Low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMesssage('☠ You lose!');
      document.querySelector('.score').textContent = 0;
    }
  }

  // Refactoring the below code using DRY Principle
  // 1. Identify duplicate code

  // when guess is too high
  //   else if (guess > secretNumber) {
  //     if (score > 1) {
  //       document.querySelector('.message').textContent = '📈 Too High!';
  //       score--;
  //       document.querySelector('.score').textContent = score;
  //     } else {
  //       document.querySelector('.message').textContent = '☠ You lose!';
  //       document.querySelector('.score').textContent = 0;
  //     }

  //     // When guess is too low
  //   } else if (guess < secretNumber) {
  //     if (score > 1) {
  //       document.querySelector('.message').textContent = '📉 Too Low!';
  //       score--;
  //       document.querySelector('.score').textContent = score;
  //     } else {
  //       document.querySelector('.message').textContent = '☠ You lose!';
  //       document.querySelector('.score').textContent = 0;
  //     }
  //   }
});

// the code document.querySelector('.message').textContent is used many times so we can make a function for it, making the code more DRY

function displayMesssage(message) {
  document.querySelector('.message').textContent = message;
}

// reset and start new game
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMesssage('Start guessing...');
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
