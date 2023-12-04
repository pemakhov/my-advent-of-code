import input from './input.mjs';
import parseInput from './data-parser.mjs';

const LIMITS = {
  red: 12,
  green: 13,
  blue: 14,
};

function isValid(game) {
  return !game.some(({ red = 0, green = 0, blue = 0 }) => red > LIMITS.red || green > LIMITS.green || blue > LIMITS.blue);
}

function sumValidGameIds(games) {
  return games.reduce((acc, game, i) => isValid(game) ? acc + i + 1 : acc, 0);
}

const parsedInput = parseInput(input);

function calcGamePower(game) {
  const [r, g, b] = game.reduce(
    ([accRed, accGreen, accBlue], { red = 0, green = 0, blue = 0 }) => [
      Math.max(accRed, red),
      Math.max(accGreen, green),
      Math.max(accBlue, blue),
    ],
    [0, 0, 0],
  );

  return r * g * b;
}

function calcPower(games) {
  return games.reduce((acc, game) => acc + calcGamePower(game), 0);
}

console.log('Part one result:', sumValidGameIds(parsedInput));
console.log('Part two result:', calcPower(parsedInput));
