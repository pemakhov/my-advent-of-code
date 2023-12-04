import input from './input.mjs';

function prepareInput(data) {
  return data.split('\n').map((row) => row.trim()).filter((x) => x);
}

const reverse = (data) => data.split('').reverse().join('');

const indexOfFirstDigit = (data) => data.search(/(\d+)/);

const extractFirst = (data) => {
  const index = indexOfFirstDigit(data);

  return data.slice(index, index + 1);
}

function getRowNumber(data) {
  return parseInt(`${extractFirst(data)}${extractFirst(reverse(data))}`, 10);
}

const sum = (acc, next) => acc + next;

function process(data) {
  return prepareInput(data)
    .map(getRowNumber)
    .reduce(sum, 0);
}

console.log(process(input));
