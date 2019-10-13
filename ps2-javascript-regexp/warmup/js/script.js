/* Time constants */
const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 3600;
const HOURS_IN_DAY = 24;
const DAYS_IN_MONTH = 30.44;
const MONTHS_IN_YEAR = 12;

/* Patterns */
const isNumberPattern = /^[0-9-]+$/;
const isTimeHMSPattern = /^\d\d:[0-5]\d:[0-5]\d$/;
const isValidDatePattern = /^(\d{4})-\d\d-\d\dT\d\d:\d\d(:\d\d$|$)/;
const isBoardDimensionsPattern = /^\d+x\d+$/;
const isURLPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
const isIPPattern = /(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;
const isRegExPattern = /\/.+(\/(?=([gimsuy]|$)))([gimsuy]+|$)/;

/* Tests if given matchingWord matches given pattern
 *  matchingWord - word or phrase that shell be tested;
 *  pattern - the pattern to check.
 */
const matchPattern = (matchingWord, pattern) => pattern.test(matchingWord);

/* --- 01 --- */
/* Calculates the sum of eligible numbers from the range from a to b
 *  a, b - the beginning and the end of the range.
 */
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
  /* Restriction to avoid stack overflow */
  const MAX_NUMBER = 9999999;
  /* The variable containing the result message */
  let result;
  /* The sum of eligible numbers of the range */
  if (first < -MAX_NUMBER || last > MAX_NUMBER) {
    result = `Numbers must be bigger than -${MAX_NUMBER}, but smaller than ${MAX_NUMBER}.`;
  } else {
    result = calcSum(first, last);
    result = `Magic sum is  ${result}`;
  }
  document.getElementById('magic_sum').innerHTML = result;
};

/* --- 02 --- */
// a.
/* Calculates the number of hours from an amount of seconds */
const getHours = (seconds) => Math.floor(seconds / SECONDS_IN_HOUR);

/* Calculates the remainder of seconds
 *  seconds - the total amount of seconds;
 *  hours - the number of hours to extract from amount of seconds
 */
const substractHours = (seconds, hours) => seconds - (hours * SECONDS_IN_HOUR);

/* Calculates the number of minutes from an amount of seconds */
const getMinutes = (seconds) => Math.floor(seconds / SECONDS_IN_MINUTE);

/* Calculates the remainder of seconds
 *  seconds - the total amount of seconds;
 *  minutes - the number of minutes to extract from amount of seconds
 */
const substractMinutes = (seconds, minutes) => seconds - (minutes * SECONDS_IN_MINUTE);

/* Adds the leading zero to one digit numbers */
const addLeadingZero = (someNumber) => {
  if (someNumber.toString().length === 1) {
    return `0${someNumber}`;
  }
  return `${someNumber}`;
};

/* Converts seconds into hh:mm:ss format and inserts into HTML */
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
/* Calculates the number of seconds */
const countSeconds = (hours, minutes, seconds) => hours * SECONDS_IN_HOUR + minutes
  * SECONDS_IN_MINUTE + seconds;

/* Calculates seconds and inserts them into HTML */
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
/* Some more time constants */
const secondsInDay = SECONDS_IN_HOUR * HOURS_IN_DAY;
const secondsInMonth = secondsInDay * DAYS_IN_MONTH;
const secondsInYear = secondsInMonth * MONTHS_IN_YEAR;

/* Gets the number of some periods of time (hours, months, etc.)
 *  totalSeconds - the total number of seconds;
 *  secondsInPeriod - the number of seconds in one period (i.e. 60 seconds in one minute).
 */
const getNomberOfPeriods = (totalSeconds, secondsInPeriod) => Math.floor(totalSeconds
  / secondsInPeriod);

/* Calculates the remainder of seconds
 *  totalSeconds - the total amount of seconds;
 *  numberOfPeriods - the number of periods;
 *  secondsInPeriod - the number of seconds in one period.
 */
const extractPeriod = (totalSeconds, numberOfPeriods, secondsInPeriod) => totalSeconds
  - numberOfPeriods * secondsInPeriod;

/* Calculates the period of time between two dates and puts it into HTML */
const putTimePeriod = (d1, d2) => {
  /* Check if dates are valid and return from the function if not */
  if (!isValidDatePattern.test(d1) || !isValidDatePattern.test(d1)) {
    document.getElementById('time_between_dates').innerHTML = 'Invalid date(s)';
    return;
  }
  /* Create date objects */
  const firstDate = new Date(d1);
  const secondDate = new Date(d2);
  /* The whole time period in seconds */
  const totalSeconds = Math.abs(firstDate - secondDate) / MILLISECONDS_IN_SECOND;
  /* Years in the period */
  const resultYears = getNomberOfPeriods(totalSeconds, secondsInYear);
  let leftSeconds = extractPeriod(totalSeconds, resultYears, secondsInYear);
  /* Months in the period */
  const resultMonths = getNomberOfPeriods(leftSeconds, secondsInMonth);
  leftSeconds = extractPeriod(leftSeconds, resultMonths, secondsInMonth);
  /* Days in the period */
  const resultDays = getNomberOfPeriods(leftSeconds, secondsInDay);
  leftSeconds = extractPeriod(leftSeconds, resultDays, secondsInDay);
  /* Hours in the period */
  const resultHours = getNomberOfPeriods(leftSeconds, SECONDS_IN_HOUR);
  leftSeconds = extractPeriod(leftSeconds, resultHours, SECONDS_IN_HOUR);
  /* Minutes in the period */
  const resultMinutes = getNomberOfPeriods(leftSeconds, SECONDS_IN_MINUTE);
  leftSeconds = extractPeriod(leftSeconds, resultMinutes, SECONDS_IN_MINUTE);
  leftSeconds = Math.round(leftSeconds);
  document.getElementById('time_between_dates').innerHTML = `${resultYears} year(s), 
  ${resultMonths} month(s), ${resultDays} day(s), 
  ${resultHours} hour(s), ${resultMinutes} minute(s), ${leftSeconds} second(s)`;
};

/* --- 04 --- */
/* Open and close HTML tags for the board elements */
const boardHTML = ['<div class="board">', '</div>'];
const rowHTML = ['<div class="board__row">', '</div>'];
const darkCellHTML = '<div class="board__cell"></div>';
const lightCellHTML = '<div class="board__cell board__cell--light"></div>';

/* Draws one row
 *  width - the number of cells in the row;
 *  odity - the indicator of a color of the first cell.
 */
const constructRow = (width, odity) => {
  let row = rowHTML[0];
  let isOdd = odity;
  for (let i = 0; i < width; i += 1) {
    if (isOdd) {
      row = row.concat(lightCellHTML);
    } else {
      row = row.concat(darkCellHTML);
    }
    isOdd = !isOdd;
  }
  row = row.concat(rowHTML[1]);
  return row;
};

/* Draws the board
 *  width, height - the number of cells in a row and a column
 */
const constructBoard = (width, height) => {
  let board = boardHTML[0];
  let isOdd = true;
  for (let i = 0; i < height; i += 1) {
    board = board.concat(constructRow(width, isOdd));
    isOdd = !isOdd;
  }
  board = board.concat(boardHTML[1]);
  return board;
};

/* Draws a chess board according to the dimensions from the input */
const drawBoard = (dimensions) => {
  if (!isBoardDimensionsPattern.test(dimensions)) {
    document.getElementById('chess_board').innerHTML = 'Invalid board dimensions';
    return;
  }
  const dimensionsArray = dimensions.split('x');
  const width = parseInt(dimensionsArray[0], 10);
  const height = parseInt(dimensionsArray[1], 10);
  const MAX_DIMENSION = 100;
  /* The variable containing an error message or a board HTML */
  let result;
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    result = `Widht or length can't be bigger than ${MAX_DIMENSION}`;
  } else {
    result = constructBoard(width, height);
  }
  document.getElementById('chess_board').innerHTML = result;
};

/* --- 05 --- */
/* Constructs the URL in HTML format.
 * Substracts the "http://" or "http://" part from the URL text.
 *  source - the source of the URL.
 */
const makeLink = (source) => {
  const link = source.trim();
  const linkName = (link.startsWith('http')) ? link.substring(link.indexOf(':') + 3) : link;
  console.log(link);
  if (matchPattern(link, isURLPattern) || matchPattern(link, isIPPattern)) {
    return `<a href="${link}" target="_blank">${linkName}</a>, `;
  }
  return '';
};

/* Parses links and URLs, form HTML code for web-links and inserts them into HTML */
const processURLAndIP = (linksList) => {
  let data = linksList.split(',');
  data = data.map((link) => makeLink(link));
  const result = data.reduce((accumulator, link) => accumulator + link);
  document.getElementById('list-of-url-and-ip').innerHTML = result.substring(0, result.length - 2);
};

/* --- 06 --- */
/* Splits the RegExp into two parts: RegExp and flags
 *  returns the array where the 0 element contains RegExp and the 1-st - flags
 */
const splitRegEx = (reg) => {
  const indexOfSplitter = reg.lastIndexOf('/');
  return [reg.substring(1, indexOfSplitter), reg.substring(indexOfSplitter + 1)];
};

/* Creates a RegExp object from the text or a RegExp */
const makeRegEx = (phrase) => {
  if (phrase === '') return '';
  if (isRegExPattern.test(phrase)) {
    const regExParts = splitRegEx(phrase);
    /* Put RegExp into paranthases to include found phrase into final array at split */
    return new RegExp(`(${regExParts[0]})`, regExParts[1]);
  }
  return new RegExp(`(${phrase})`, 'g');
};

/* Finds and highlights the input */
const findMatches = (text = '', matchPhrase = '') => {
  let result = text.replace(/</g, '&lt').replace(/>/g, '&gt');
  const regExPhrase = makeRegEx(matchPhrase);
  const matched = result.split(regExPhrase);
  for (let i = 0; i < matched.length; i += 1) {
    if (regExPhrase.test(matched[i])) {
      matched[i] = '<mark>'.concat(matched[i]).concat('</mark>');
    }
  }
  result = matched.reduce((acc, elem) => acc.concat(elem));
  document.getElementById('marked-text').innerHTML = result;
};
