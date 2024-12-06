import INPUT from './input.mjs';

console.time();

const [seedData, ...maps] = INPUT.split('\n\n');

const seeds = seedData.split(': ')[1].split(' ').map((x) => parseInt(x, 10));
seeds.sort((a, b) => (a < b ? -1 : 1));

const data = maps
  .map((block) => block.split(' map:\n'))
  .map(([header, blockData]) => [
    header.split('-to-'),
    blockData.split('\n')
      .map(
        (row) => row
          .split(' ')
          .map((x) => parseInt(x, 10)),
      ),
  ])
  .map(([[source, destination], data]) => ({ source, destination, data }));

const getLocationBySeed = (value, src = 'seed') => {
  const block = data.find(({ source }) => source === src);
  const [destination = 0, source = 0] = block.data.find(([, source, range]) => value >= source && value < (source + range)) || [];
  const newValue = destination + (value - source);

  return (block.destination === 'location') ? newValue : getLocationBySeed(newValue, block.destination);
}

const locations = seeds.map((value) => getLocationBySeed(value));

const lowestLocationNumber = Math.min(...locations)

console.log({ lowestLocationNumber });

const initialSeeds = seeds.reduce(
  (acc, n, i) => (i % 2) ? [...acc.slice(0, acc.length - 1), [...acc[acc.length - 1], n]] : [...acc, [n]],
  [],
);

let lowestLocationByInitialNumber = Infinity;
let counter = 0;

for (let [value, range] of initialSeeds) {
  for (let i = 0; i < range; i += 1) {
    lowestLocationByInitialNumber = Math.min(getLocationBySeed(value + i), lowestLocationByInitialNumber);
    counter += 1;

    if (counter % 1_000_000 === 0) {
      console.log({ counter });
    }
  }

  console.log({ value, lowestLocationByInitialNumber })
};

console.log({ lowestLocationByInitialNumber });

console.timeEnd();

