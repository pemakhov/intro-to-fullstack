/* Calculates the sum of eligible numbers from the range of a to b */
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
const handleClick = (a, b) => {
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
