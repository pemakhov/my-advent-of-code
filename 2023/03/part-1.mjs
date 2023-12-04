import input from './input.mjs';
import Parser from './parser.mjs';

const parser = new Parser(input);
const data = parser.render();

const checked = data.map((row) => row.map((value) => false));
const partNumbers = [];
let currentNumber = '';
let isPartNumber = false;

function reset() {
  if (currentNumber && isPartNumber) {
    partNumbers.push(parseInt(currentNumber, 10));
  }

  currentNumber = '';
  isPartNumber = false;
}

function isSpecialSymbol(value) {
  const isDigit = !isNaN(parseInt(value));
  const isDot = value === '.'

  return !isDigit && !isDot;
}

function checkIsPartNumber(i, j) {
  const neighbors = [
    data[i]?.[j - 1],
    data[i - 1]?.[j - 1],
    data[i - 1]?.[j],
    data[i - 1]?.[j + 1],
    data[i]?.[j + 1],
    data[i + 1]?.[j + 1],
    data[i + 1]?.[j],
    data[i + 1]?.[j - 1],
  ].filter((x) => x);

  neighbors.forEach((value) => {
    if (isSpecialSymbol(value)) {
      isPartNumber = true;
    }
  });
}

function search(i, j) {
  const value = data[i][j];

  if (checked[i][j]) return;

  checked[i][j] = true;

  if (isNaN(parseInt(value))) return '';

  currentNumber += value;

  checkIsPartNumber(i, j);

  return search(i, j + 1)
}

function find(input) {
  for (let i = 0; i < input.length; i += 1) {
    for (let j = 0; j < input[i].length; j += 1) {
      search(i, j);
      reset();
    }
  }
}

function accumulate(data) {
  return data.reduce((acc, n) => acc + n, 0);
}

find(data);

console.log(accumulate(partNumbers));
