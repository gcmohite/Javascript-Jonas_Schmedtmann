'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

// console.log(btnsOpenModal);

const openModal = function () {
  // removes class 'hidden' from the element
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  // adds class 'hidden' to the element
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++) {
//   btnsOpenModal[i].addEventListener('click', openModal);
// }

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Keyboard events are called global events because they dont happen on one specific element, and for such events we usually listen on the whole document rather than a single element. Therefor we are doing the addEventListener on the document itself as it contains everything.

// we are using 'keydown' as event which means anytime any key is pressed down on the keyboard. There is also 'keyup' which means anytime key is released and we also have 'keypress' which means that the a key is continuously kept pressed.

// The information about which key is pressed is stored in the event that occurs whenever a key is pressed. Javascript generates an object which contains all the information of the event (the event object) and we can access that object in the event handler function.
document.addEventListener('keydown', function (e) {
  // console.log('A key was pressed');
  console.log(e);

  // we are using that event object as an input to the event handler (we simply used th name 'e', could have used anything), and we are checking if escape key is pressed. Also, we are checking if the elements have the class 'hidden' and only if they are not present, should we proceed to add the 'hidden' class to them.
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
