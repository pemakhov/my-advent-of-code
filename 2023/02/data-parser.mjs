import input from "./input.mjs";

const example = 'Game 100: 6 green, 15 red, 12 blue; 9 red; 16 red; 17 red, 3 blue, 7 green';

function parseRow(row) {
  return row.split(';')
    .map((element) => element.trim())
    .map((element) => {
      return Object.fromEntries(
        element.split(',')
          .map((part) => part.split(' ').reverse())
          .map(([key, value]) => [key.trim(), parseInt(value, 10)]),
      )
    });
}

export default function parseInput(data) {
  return data
    .split('\n')
    .filter((x) => x)
    .map((row) => row.slice(row.indexOf(':') + 1))
    .map(parseRow);
}

// console.log(parseInput(input).slice(0, 3));
