import input from './input.mjs';
import Parser from './parser.mjs';

const parser = new Parser(input);
const data = parser.render();

const checked = data.map((row) => row.map((value) => false));
const partNumbers = [];
const gearRatios = [];
let currentNumber = '';

function pushAndReset() {
  if (currentNumber) {
    partNumbers.push(parseInt(currentNumber, 10));
  }

  currentNumber = '';
}

function isDigit(value) {
  return !isNaN(parseInt(value));
}

function getNumberStart(i, j) {
  const value = data[i]?.[j - 1];

  if (!value || !isDigit(value)) return [i, j];

  return getNumberStart(i, j - 1);
}

function checkParts(i, j) {
  const coords = [
    [i, j - 1],
    [i - 1, j - 1],
    [i - 1, j],
    [i - 1, j + 1],
    [i, j + 1],
    [i + 1, j + 1],
    [i + 1, j],
    [i + 1, j - 1],
  ];

  coords.forEach(([x, y]) => {
    if (!isDigit(data[x]?.[y])) return;
    const start = getNumberStart(x, y);
    // console.log([x, y], start);

    search(...start);
    pushAndReset();
  });

  if (partNumbers.length === 2) {
    gearRatios.push(partNumbers[0] * partNumbers[1]);
  }

  partNumbers.length = 0;
}

function search(i, j) {
  const value = data[i][j];

  if (checked[i][j]) return;

  checked[i][j] = true;

  if (isNaN(parseInt(value))) return '';

  currentNumber += value;

  return search(i, j + 1)
}

const isGear = (value) => value === '*';

function find(input) {
  for (let i = 0; i < input.length; i += 1) {
    for (let j = 0; j < input[i].length; j += 1) {
      if (!isGear(data[i][j])) continue;

      checkParts(i, j);
    }
  }
}

function accumulate(data) {
  return data.reduce((acc, n) => acc + n, 0);
}

find(data);

console.log(accumulate(gearRatios));
