'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// for tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// for navbar animation
const nav = document.querySelector('nav');

// sticky navbar
const header = document.querySelector('.header');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// SMOOTH SCROLLING

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  // co-ordinates of the section1 element
  // console.log(s1coords);

  // co-ordinated of the clicked button
  // console.log(e.target.getBoundingClientRect());

  //
  // console.log(e);

  // console.log('Current scroll: ', window.scrollX, window.scrollY);
  // console.log(
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // using the scrollTo method
  // window.scrollTo({
  //   top: s1coords.top + window.scrollY,
  //   left: s1coords.left + window.scrollX,
  //   behavior: 'smooth',
  // });

  // using the scrollBy method
  // window.scrollBy({
  //   top: s1coords.top,
  //   left: s1coords.left,
  //   behavior: 'smooth',
  // });

  // using the scrollIntoView method
  section1.scrollIntoView({ behavior: 'smooth' });
});

// getBoundingClientRect() method returns object containing position of element w.r.t viewport and also returns size of the element. The properties in the object will be: x, y, left, top, right, bottom, height and width. the rectangle's boundary edges (top, right, bottom, left) change their values every time the scrolling position changes (because their values are relative to the viewport and not absolute).

// PAGE NAVIGATION

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     // console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// In the above method, we are attaching an event listener to every single link in the nav, effectively making multiple copies of the same callback function for each link in the navbar, which is not efficicent (what if we had thousands of links). Hence to avoid this we can use EVENT DELEGATION. In event delegation, we make use of the fact that events bubble up to the parent element in the DOM tree, and hence we can put the event listener on a common parent of all the elements.

// 1. Add event listener to common parent element
// 2. Determine what element originated the event using e.target
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);
  // the condition checks if we have actually clicked on any of the link and not the spaces between them.
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// TABBED COMPONENT

// there is a span element inside each tab button, so if we click on the span, e.target will be the span element. But we need the tab button element every time. Hence we can use closest() method to get it.
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Will check if we have not clicked on the buttons but the spaces between them and if so, do nothing(terminate the function). Such a statement is called a GUARD CLAUSE
  if (!clicked) return;
  // We could have put the below statement in an if block with the same condition, but using a guard clause is a new thing.

  // remove 'active' class for all tab buttons
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  // add 'active' class for selected tab button
  clicked.classList.add('operations__tab--active');

  // hide content of other tabs by removing 'active' class for all
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // show content of selected tab by adding 'active' class to it
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// MENU FADE ANIMATION

const handleHover = function (e) {
  // console.log(this);
  // console.log(e.currentTarget);

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

//  (mouseenter does not bubble, mouseover does)

/////////////////////////////////////////////
// Here we are passing arguments to the event handler function. We cant just call a function because that would return a value, and JS expects a callback function in that place. Hence we define a function which then calls the actual handler.
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });
////////////////////////////////////////////

////////////////////////////////////////////
// But instead of the above approach, we can use bind method to manually set the this keyword to the opacity value we want to pass. Then in the handler function, we can use 'this' as a value. Essentially we have passed an argument using the 'this' keyword.
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// It is impossible to pass  another argument into an eventHandler function. It can only have one argument, which is the event (e). But if we want to pass additional values, we can make use of the 'this' keyword.
//////////////////////////////////////////////

// STICKY NAVIGATION
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   // console.log(window.scrollY, initialCoords.top);
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });
// The above method of using the scroll event is not efficient because we need to constantly look for the scroll coordinates, which is not good for performance, especially on devices where processing power is limited (older smartphones) A better way is to use the INTERSECTION OBSERVER API

// The Intersection Observer API allows our code to observe changes to the way a certain target element intersects another element or the viewport.

// Whenever the target meets a threshold specified for the IntersectionObserver, a callback is invoked. The callback receives a list of IntersectionObserverEntry objects and the observer. The list of entries received by the callback includes one entry for each target which reported a change in its intersection status.

// const observerCallback = function (entries, observer) {
//   // console.log(entries.entry);
//   entries.forEach(entry => {
//     console.log(entry, entry.intersectionRatio, entry.isIntersecting);
//     //   // console.log(observer);
//   });
// };

// 'root' will be the element with which the target is intersecting i.e the element that is used as the viewport for checking visibility of the target. It must be the ancestor of the target. If its value is null or not specified, then root will be the browser viewport. Here we set the root to null because we want to observe the intersection of section1 with the window (the viewport).
// 'threshold is a single number or an array of numbers which indicate at what percent of the target's intersection with the root should the observer's callback should be executed. In this case we need to execute the callback when section1 is completely in/out of the viewport or when 20% of it in/out of the viewport.
// rootMargin is the margin around the root
// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// IntersectionObserver() takes a callback function(in this case observerCallback) and an object containing options (in this case observerOptions)
// const observer = new IntersectionObserver(observerCallback, observerOptions);

// We can call the 'observe' method on the observer to observe the element we want to watch, i.e the parameter passed into the observe method will be a target element we want to watch
// observer.observe(section1);

const stickyNav = function (entries, observer) {
  const [entry] = entries;
  // console.log(observer);

  !entry.isIntersecting
    ? nav.classList.add('sticky')
    : nav.classList.remove('sticky');
};

const navHeight = nav.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// REVEALING SECTIONS ON SCROLL

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  // unobserve the sections once all are scrolled
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threhold: 0.2,
  rootMargin: '0px 0px -100px 0px',
});

const allSections = document.querySelectorAll('.section');

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// LAZY LOADING IMAGES
// selecting the images based on their attribute
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  // We can remove the 'lazy-img' class (which removes the blur filter in CSS) directly like above, but on slow connections, the images may still take time to completely load the high-resolution version. Behind the scenes, when JS is replacing the image, it emits a 'load' event once its done with downloading the loading. Hence we can first listen to the 'load' event which happens when the high-res image is fully downloaded, and then remove the blur filter.
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  // stop observing
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `200px`, // expanding the viewport from the perspective of the images so that the images start loading before they appread in the actual viewport.
});
imgTargets.forEach(img => {
  imgObserver.observe(img);
});

// SLIDER COMPONENT

// Slider selectors

const slider = function () {
  const sliderContainer = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const slidesCount = slides.length;

  // sliderContainer.style.overflow = 'visible';
  // sliderContainer.style.transform = 'scale(0.2) translate(-700px)';

  // slides.forEach((s, i) => {
  //   s.style.transform = `translateX(${100 * i}%)`;
  // });

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide === slidesCount - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = slidesCount - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    createDots(); // create dots in slider
    goToSlide(0); // replacing ln 303-305
    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.getAttribute('data-slide');
      // console.log(slide);
      // const { sliiiiide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

// LECTURES

// SELECTING CREATING AND DELETING ELEMENTS

/*
// SELECTING ELEMENTS

// We can select the entire HTML document without using the querySelector (all the tags and everything inside them) using the documentElement property:
console.log(document.documentElement);
// instead of this
console.log(document.querySelector('html'));

// selecting the entire <head>
console.log(document.head);

//selecting the entire <body>
console.log(document.body); // can do this
const body = document.querySelector('body'); // instead of this

// to select one element
const header = document.querySelector('.header');

// to select multiple elements of the same element type, class etc..
// it will return a NodeList of all those elements
const allSections = document.querySelectorAll('.section');
// NodeList(4) [section#section--1.section, section#section--2.section, section#section--3.section, section.section.section--sign-up]

////////////////////////////////////////////////////
//// .querySelector() and .querySelectorAll() are not only available on the document object, but also on the Element object. Makes it easy to select child elements
/////////////////////////////////////////////////////////

// selecting an element based on its ID
const sec1 = document.getElementById('section--1');

// selecting elements based on their HTML tag name
// selects all button elements
const allButtons = document.getElementsByTagName('button');
// selects all p elements
const allParas = document.getElementsByTagName('p');
// getElementsByTagName returns HTMLCollection, not a NodeList.
// HTMLCollection is a live-collection, that means it dymanically returns the number of elements that are present in the DOM (if we delete any, then HTMLCollection will "update its collection". NodeList does not update itself dynamically)

// selecting elements based on class name, also returns HTMLCollection
const btns = document.getElementsByClassName('btn');
*/

/*
// CREATING AND INSERTING ELEMENTS

// .insertAdjacentHTML parses text as HTML and inserts into the DOM tree (not in our HTML document)
// We can specify 4 positions where we want to insert our HTML code
// 1. beforebegin - just before the element
// 2. afterbegin - just inside the element before the first child
// 3. beforeend - just inside the element after the last child
// 4. afterend - just after the element
// const html = `<h1>Test</h1>`;
// sec1.insertAdjacentElement('afterbegin', html);

// .createElement()
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML = `${message.textContent}<button class="btn btn--close-cookie">Got it!</button>`;
header.prepend(message); // inserts as first child of the element
// header.append(message); // inserts as last child of the element

// We cannot do prepend and append at the same time for the the same DOM node, it can only exist in one place.

// If we want to apply the same DOM node at many places, we need to clone it by using cloneNode() method

const messageCopy = message.cloneNode(true);
// header.append(messageCopy);

// header.before(message); // inserts before the element
// header.after(messageCopy); // inserts after the element

// DELETING ELEMENTS
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//     messageCopy.remove();
//   });

console.log(message);

message.addEventListener('click', function () {
  message.remove();
  messageCopy.remove();

  // old way before .remove() was not introduced
  // message.parentElement.removeChild(message);
});

// STYLES, ATTRIBUTES AND CLASSES

// STYLES
//  To set style on an element
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// These styles are applies as inline styles

// We can read only the inline styles set on an element. Whatever styles are set on the element in the stylesheet cannot be read like this
console.log(message.style.fontSize); // < empty string>
console.log(message.style.backgroundColor);

// To read the styles set by the stylesheet, we can use the getComputedStyle function. It returns an object containing all the styles set on the element (all as in everything, even the default CSS properties)

console.log(getComputedStyle(message));

// We can read the individual properties since getComputedStyles returns an object
console.log(getComputedStyle(message).fontSize);
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).display);
console.log(getComputedStyle(message).fontWeight);
console.log(getComputedStyle(message).height);

// increasing height of the cookie message
// const messageHeight = getComputedStyle(message).height;
// const heightValue = parseInt(messageHeight);

// message.style.height = `${heightValue + 50}px`;
// console.log(getComputedStyle(message).height);

// or we can do it this way

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// console.log(getComputedStyle(message).height);

// Changing the values of CSS variables from JS using the setProperty method
// Here the CSS variables are defined in the :root element (which is most of the times practised everywhere) and in JS :root corresponds to the documentElement (<html> element). Here we are changing the value of the --color-primary variable using the setProperty method.
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// Changing the background color of the body element using setProperty
// document.body.style.setProperty('background-color', '#333');

// console.log(getComputedStyle(document.documentElement));
*/

//  ATTRIBUTES
// HTML elements have attributes like href, src etc. Even class and id are attributes, which we can modify using JS

const logo = document.querySelector('.nav__logo');

// Reading the attribute values
console.log(logo);
console.log(logo.src); // absolute URL of the image file
console.log(logo.alt); // "Bankist logo"
console.log(logo.id); // "logo"
console.log(logo.className); // "nav__logo"
// class wont work, need to use className

// We can read only the standard attributes which are to be expected in an element. If we have set any custom attribues, we cant read them
console.log(logo.desginer); // undefined

// We can use getAttribute intead, to read any attribute value
console.log(logo.getAttribute('designer')); // "Gautam"
console.log(logo.getAttribute('id')); // "logo"

console.log(logo.src); // absolute URL of the image file
console.log(logo.getAttribute('src')); // relative URL "img/logo.png"

// Setting attribute values
// logo.alt = 'Beautiful minimalist logo';

// or this
logo.setAttribute('alt', 'Beautiful minimalist logo');

console.log(logo.alt); // "Beautiful minimalist logo"

const twtLink = document.querySelector('.twitter-link');
console.log(twtLink.href);
console.log(twtLink.getAttribute('href'));

const accButton = document.querySelector('.btn--show-modal');
console.log(accButton.href); // absolute URL: "http://127.0.0.1:5500/#"
console.log(accButton.getAttribute('href')); // relative URL: "#"

// DATA ATTRIBUTES
// Data attributes are special attributes that we can set on HTML elements starting with the word 'data'. These are helpful in storing data in the UI.
// These can be accessed in JS by using the dataset property on the element, followed by the attribute name in camelCase
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c'); // works on only one class at a time
const isItThere = logo.classList.contains('c');

// dont use this, it will overwrite all other class names we have set and it only allows us to set only one class.
// logo.className = 'gautam'

/*
// TYPES OF EVENTS AND EVENT HANDLERS
// An event is basically a signal that is generated by a DOM node, conveying something has happened - a click, mouse movement, key press etc. We can listen for these events in our code using event handlers, and handle them as we like. But whether we handle an event or not, an event will have happened (user will always click on something whether we listen to it or not).
// https://developer.mozilla.org/en-US/docs/Web/Events

// mouseenter event
const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// });

// We can also use the old way of attaching an event on an element like below. They are usually named as on<someevent>.
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

// However, addEventListener is better, because it allows us to attach multiple event handlers on a single event. Secondly, addEventListener also allows us to remove the event handler(s), in case we dont need them at some point.

// To have the capability to remove the event handler, we must store the event handler function in a variable though.

const clickPromptMsg = function (e) {
  alert('You just clicked on the header!');
  // removing the event listener after the first click event
  h1.removeEventListener('click', clickPromptMsg);
};
h1.addEventListener('click', clickPromptMsg);

const hoverPromptMsg = function (e) {
  alert('You hovered over the heading!');
};
h1.addEventListener('mouseenter', hoverPromptMsg);
// removing the event listener after 3 seconds
setTimeout(() => h1.removeEventListener('mouseenter', hoverPromptMsg), 3000);
*/

/*
// EVENT PROPOGATION: BUBBLING AND CAPTURING

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

console.log(randomColor());

// nav__link, nav__links, nv

const navLink = document.querySelector('.nav__link');
const navLinks = document.querySelector('.nav__links');
const navBar = document.querySelector('.nav');

const randomColorPainter = function (e) {
  this.style.backgroundColor = randomColor();

  console.log(e, e.target, this, e.currentTarget);
  // e is the whole event object, e.target it the element on which we clicked (the element on which the event happened) and e.currenttarget the element(s) on which the event handler is set

  // this and e.currentTarget will be always be the same in any event handler
  console.log(this === e.currentTarget); // true

  // Stop event propogation
  // e.stopPropogation;
};

navLink.addEventListener('click', randomColorPainter);

navLinks.addEventListener('click', randomColorPainter);

// in case we want the event to be fired in capture phase and not bubbling phase on this element.
// navLinks.addEventListener('click', randomColorPainter, true);

// in case we want as if the event to not be have occured on navLinks
// navLinks.addEventListener('click', randomColorPainter.stopPropogation);

navBar.addEventListener('click', randomColorPainter);

// in case we want the event to be fired in capture phase and not bubbling phase on this element.
// navBar.addEventListener('click', randomColorPainter, true);

// in case we want as if the event to not be have occured on nav
// navBar.addEventListener('click', randomColorPainter.stopPropogation);

//////////////////////////////////////////////////////////////////
// Usually its not a good idea to fire event handlers in the capturing phase, it is rarely used, and the only reason both capturing and bubbling options are present is for historical reasons
/////////////////////////////////////////////////////////////////
*/

/*// DOM TRAVERSING
const h1 = document.querySelector('h1');

// Going downwards: selecting child elements
// querySelector/querySelectorAll works on elements too
console.log(h1.querySelectorAll('.highlight'));
// this would select the elements with class of 'highlight' no matter how many levels they are nested in the DOM tree from the h1 element, they dont just have to be direct children. If there are other elements with a class of 'highlight' which are not children of h1, they would not be selected.

// Selecting only direct immediate children. Returns a NodeList which  includes even text and comment nodes.
console.log(h1.childNodes);

// Returns an HTMLCollection of all the direct child HTML elements inside the h1
console.log(h1.children);

// selecting the first child element
console.log(h1.firstElementChild);
h1.firstElementChild.style.color = 'white';

// Selecting the first child node
console.log(h1.firstChild);

// selecting the last child element
console.log(h1.lastElementChild);
h1.lastElementChild.style.color = 'teal';

// Going upwards: selecting parent elements

// Direct parent node/element
console.log(h1.parentNode);
console.log(h1.parentElement);

// General ancestor element
// Selects and returns the closest ancestor element with a class of 'header'
console.log(h1.closest('.header'));
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary';

// The closest() method can be thought of as the opposite to querySelector() method. querySelector selects elements down the DOM tree from the element at which we are calling it, no matter how nested, whereas closest() selects elements up the DOM tree from the element at which we are calling it.

// Going sideways: selecting siblings
// We can select only direct siblings not general siblings, so either previous or next sibling only
console.log(h1.previousSibling); // previous node
console.log(h1.previousElementSibling); // previous element

console.log(h1.nextSibling); // next node
console.log(h1.nextElementSibling); // next element

// to get all the siblings, we can first get the parent and from there get all the children
console.log(h1.parentElement.children);
const allHeaderElements = [...h1.parentElement.children];
allHeaderElements.forEach(function (el) {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
});
*/

// LIFECYCLE DOM EVENTS
// Right from the moment a web page is first accessed until the user leaves it, different events occur in the DOM

// The 'DOMContentLoaded' event if fired by the document as soon as the HTML is parsed and the DOM tree is created. Also, all scripts must be downloaded and executed before the 'DOMContentLoaded' event can happen. This event does not wait for images and other external resources to load,  just HTML and JavaScript need to be loaded.
// We want all our code to be executed only after the DOM is ready. But for that we need not wrap all our code into an event listener like below, we have the HTML script tag to take care of that, which we place right at the end of the HTML code, as the last element inside the <body> element. (see index.html)
document.addEventListener('DOMContentLoaded', function (e) {
  console.log(e);
});

// The 'load' event is fired by the window as soon as HTML is parsed and all the images and external resources like CSS files are also loaded.
window.addEventListener('load', function (e) {
  console.log(e);
});

// The 'beforeunload' event is fired right before the user is about to leave the webpage (when user clicks on the close tab button). This event can be helpful to confirm with user if they really want to close the page
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });

// EFFICIENT SCRIPT LOADING: defer and async
