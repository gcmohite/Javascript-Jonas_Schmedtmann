// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// const name = 'gautam';

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    if (curTemp > max) max = curTemp;

    if (curTemp < min) min = curTemp;
  }

  return max - min;
};

console.log(calcTempAmplitude(temperatures));

console.table(temperatures);
