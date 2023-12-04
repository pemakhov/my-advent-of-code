import input from '../02/input.mjs';

const digits = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

function prepareInput(data) {
  return data.split('\n')
    .map((row) => row.trim())
    .filter((x) => x);
}

const replaceWordWithDigit = (data, word, digit) => data.replaceAll(word, digit);

const getEntry = (data, straight) => {
  const entries = Object.entries(digits);
  let index = straight ? Infinity : -1;
  let entry = null;

  entries.forEach((e) => {
    const newIndex = straight ? data.indexOf(e[0]) : data.lastIndexOf(e[0]);

    // console.log({ entry, newIndex, index })

    if (newIndex !== -1 && straight ? (newIndex < index) : newIndex > index) {
      index = newIndex;
      entry = e;
    }
  });

  return entry || entries[0];
}

function replaceFirstWordWithDigit(data, straight) {
  let entry = getEntry(data, straight);

  return replaceWordWithDigit(data, ...entry);
}

const reverse = (data) => data.split('').reverse().join('');

const indexOfFirstDigit = (data) => data.search(/(\d+)/);

const extractFirst = (data) => {
  const withReplacement = replaceFirstWordWithDigit(data);
  const index = indexOfFirstDigit(withReplacement);

  return withReplacement.slice(index, index + 1);
}

function getRowNumber(data) {
  const straight = replaceFirstWordWithDigit(data, true);
  const reversed = replaceFirstWordWithDigit(data, false);

  return parseInt(`${extractFirst(straight)}${extractFirst(reverse(reversed))}`, 10);
}

const sum = (acc, next) => acc + next;

function process(data) {
  return prepareInput(data)
    .map(getRowNumber)
    .reduce(sum, 0);
}

console.log(process(input));
