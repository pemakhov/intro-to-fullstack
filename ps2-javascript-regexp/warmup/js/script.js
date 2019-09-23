const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 3600;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const DAYS_IN_MONTH = 30.44;
const MONTHS_IN_YEAR = 12;

const isNumberPattern = /^[0-9-]+$/;
const isTimeHMSPattern = /^\d\d:[0-5]\d:[0-5]\d$/;

/* --- 01 --- */
/* Calculates the sum of eligible numbers from the range from a to b */
const calcSum = (a, b) => {
  /* Numbers of a range ending in these digits are eligible */
  const goodNumbers = [2, 3, 7];
  /* Accumulates the sum */
  let total = 0;
  for (let i = a; i <= b; i += 1) {
    const lastDigit = Math.abs(i % 10);
    if (goodNumbers.includes(lastDigit)) {
      total += i;
    }
  }
  return total;
};

/* Puts the sum of eligible numbers into HTML */
const putSum = (a, b) => {
  if (!isNumberPattern.test(a) || !isNumberPattern.test(b)) {
    document.getElementById('magic_sum').innerHTML = 'The input must be a number';
    return;
  }
  let first = parseInt(a, 10);
  let last = parseInt(b, 10);
  /* Replace the numbers if first is bigger than the second */
  if (first > last) {
    const temp = first;
    first = last;
    last = temp;
  }
  /* The sum of eligible numbers of the range */
  const result = calcSum(first, last);
  document.getElementById('magic_sum').innerHTML = `Magic sum is  ${result}`;
};

/* --- 02 --- */
// a.
const getHours = (seconds) => Math.floor(seconds / SECONDS_IN_HOUR);
const substractHours = (seconds, hours) => seconds - (hours * SECONDS_IN_HOUR);
const getMinutes = (seconds) => Math.floor(seconds / SECONDS_IN_MINUTE);
const substractMinutes = (seconds, minutes) => seconds - (minutes * SECONDS_IN_MINUTE);
const addLeadingZero = (someNumber) => {
  if (someNumber.toString().length === 1) {
    return `0${someNumber}`;
  }
  return `${someNumber}`;
};

const convertSeconds = (totalSeconds) => { 
  if (!isNumberPattern.test(totalSeconds)) {
    document.getElementById('formatted_time').innerHTML = 'The input must be a number';
    return;
  }
  let seconds = parseInt(totalSeconds, 10);
  let hours = getHours(seconds);
  seconds = substractHours(seconds, hours);
  let minutes = getMinutes(seconds);
  seconds = substractMinutes(seconds, minutes);
  hours = addLeadingZero(hours);
  minutes = addLeadingZero(minutes);
  seconds = addLeadingZero(seconds);
  document.getElementById('formatted_time').innerHTML = `${hours}:${minutes}:${seconds}`;
};

// b.
const countSeconds = (hours, minutes, seconds) => hours * SECONDS_IN_HOUR + minutes
  * SECONDS_IN_MINUTE + seconds;

const putSeconds = (givenTime) => {
  if (!isTimeHMSPattern.test(givenTime)) {
    document.getElementById('counted_seconds').innerHTML = 'Input doesn\'t comply with the pattern';
    return;
  }
  const time = givenTime.split(':');
  const hours = parseInt(time[0], 10);
  const minutes = parseInt(time[1], 10);
  const seconds = parseInt(time[2], 10);
  document.getElementById('counted_seconds').innerHTML = countSeconds(hours, minutes, seconds);
};
/* --- 03 --- */
const secondsInDay = SECONDS_IN_HOUR * HOURS_IN_DAY;
const secondsInMonth = secondsInDay * DAYS_IN_MONTH;
const secondsInYear = secondsInMonth * MONTHS_IN_YEAR;

const getNomberOfPeriods = (totalSeconds, secondsInPeriod) =>  Math.floor(totalSeconds / secondsInPeriod);
const extractPeriod = (totalSeconds, nomberOfPeriods, secondsInPeriod) => totalSeconds - nomberOfPeriods * secondsInPeriod;

const putTimePeriod = (d1, d2) => {
  const firstDate = new Date(d1);
  const secondDate = new Date(d2);
  // Time period in seconds
  const totalSeconds = Math.abs(firstDate - secondDate) / MILLISECONDS_IN_SECOND;
  const resultYears = getNomberOfPeriods(totalSeconds, secondsInYear);
  let leftSeconds = extractPeriod(totalSeconds, resultYears, secondsInYear);
  const resultMonths = getNomberOfPeriods(leftSeconds, secondsInMonth);
  leftSeconds = extractPeriod(leftSeconds, resultMonths, secondsInMonth);
};
