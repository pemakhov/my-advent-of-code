import INPUT from './input.mjs';

const [seedData, ...maps] = INPUT.split('\n\n');

const seeds = seedData.split(': ')[1].split(' ').map((x) => parseInt(x, 10));

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

const lowestLocationNumber = Math.min(...seeds.map((value) => getLocationBySeed(value)))

console.log({ lowestLocationNumber });
