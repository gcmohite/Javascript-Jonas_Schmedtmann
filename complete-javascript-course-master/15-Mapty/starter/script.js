'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Workout {
  date = new Date();
  // id = (new Date() + '').slice(4, 21).replaceAll(' ', '').replaceAll(':', '');
  id = Date.now();

  // just a public interface
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in kms
    this.duration = duration; // in mins
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
    // console.log(this.description);
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  icon = '🏃‍♀️';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;

    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    // console.log(this.pace);
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  icon = '🚴‍♂️';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    // console.log(this.speed);
    return this.speed;
  }
}

// const run1 = new Running([15.8855252, 74.50878], 5, 30, 150);
// const cycle1 = new Cycling([15.8855252, 74.50878], 27, 95, 523);

// console.log(run1);
// console.log(cycle1);

//////////////////////////////////////////////////////////
// APPLICATION ARCHITECTURE

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// we can call the _getPosition() instead of calling it from outside the constructor will always be executed first whenever an instance is created, putting the _getPosition() call inside the constructor will make sure that it is executed.
// 'change' is an event on a select input element which is fired whenever we select a different option.
class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  constructor() {
    // get user's position
    this._getPosition();

    // get data from local storage
    this._getLocalStorage();

    // Attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);

    // move to marker on click
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  _getPosition() {
    // USING THE GEOLOCATION API TO GET POSITION
    navigator.geolocation?.getCurrentPosition(
      this._loadMap.bind(this),
      function () {
        alert(`Could not get your location`);
      }
    );
  }

  _loadMap(position) {
    // console.log(position);
    const { latitude, longitude } = position.coords;
    // console.log(latitude, longitude);

    // making a google maps link from the latitude and longitude position we got from geolocation API
    // console.log(`https://www.google.com/maps/@${latitude},${longitude},15z`);

    // Displaying map using Leaflet library
    const coords = [latitude, longitude];

    // console.log(this);
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
    // console.log(this.#map);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    // once the map is loaded, we can render the previous workouts from localStorage
    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(evt) {
    this.#mapEvent = evt;

    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // clear all the input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    // Hiding the form
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    // Get data from the form
    const type = inputType.value.toLowerCase();
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    let workout;

    const { lat, lng } = this.#mapEvent.latlng;

    // helper function for data validation
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    // If workout is for running, create running object

    // First check if data is valid (guard clause)
    if (type === 'running') {
      const cadence = +inputCadence.value;

      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert(`Inputs have to be positive numbers`);

      // creating the object
      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout is for cycling, create cycling object

    // First check if data is valid (guard clause)
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert(`Inputs have to be positive numbers`);

      // creating the object
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);
    // console.log(workout);

    // Render workout on map as a marker
    // console.log(this.#mapEvent);
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Hide form and clear input data
    this._hideForm();

    // store workouts in local storage
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
          closeButton: false,
        })
      )
      .setPopupContent(`${workout.icon} ${workout.description} `)
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>`;

    if (workout.type === 'running')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `;

    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
      `;

    form.insertAdjacentHTML('afterend', html);
  }
  _moveToPopup(e) {
    // console.log(e.target.closest('.workout'));

    const workoutEl = e.target.closest('.workout');
    // console.log(workoutEl);

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      wrk => wrk.id === +workoutEl.dataset.id
    );
    // console.log(workout);

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // using the public interface
    // however when we load objects from localStorage, this will not work because while parsing, those objects will lose the prototype inheritance and will be just regular objects. so they wont be able to access this method. hence disabled this.
    // workout.click();
  }

  // to store the workouts in local storage, we are using the localStorage API and the setItem method
  // JSON.stringify converts an object literal into a string
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  // We can use the getItem method on the localStorage API to get data from the loal storage. JSON.parse converts the stringified objects back to regular objects
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    // console.log(data);

    if (!data) return;
    this.#workouts = data;
    // console.log(this.#workouts);

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();

// console.log(firstName);
