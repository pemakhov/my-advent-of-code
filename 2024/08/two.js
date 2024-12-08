const fs = require("node:fs/promises");

const YEAR_DIR = process.cwd();
const DAY = "08";
const filePath = `${YEAR_DIR}/${DAY}/input.txt`;

const parseInput = (input) => {
  return input.split("\n").map((row) => row.split(""));
};

const scanAntennas = (data) => {
  const antennas = new Map();

  for (let i = 0; i < data.length; i += 1) {
    for (let j = 0; j < data[i].length; j += 1) {
      const node = data[i][j];

      if (node !== ".") {
        antennas.set(node, [...(antennas.get(node) || []), { x: j, y: i }]);
      }
    }
  }

  return antennas;
}

const getAntinodes = ({ x, y }, { x: x1, y: y1 }, data) => {
  if (y > y1) {
    [x, y, x1, y1] = [x1, y1, x, y];
  }

  const antinodes = [];

  let ax = x > x1 ? x + Math.abs(x - x1) : x - Math.abs(x - x1);
  let ay = y - Math.abs(y - y1);

  while (data[ay]?.[ax]) {
    antinodes.push({ x: ax, y: ay });
    ax = x > x1 ? ax + Math.abs(x - x1) : ax - Math.abs(x - x1);
    ay = ay - Math.abs(y - y1);
  }

  let bx = x1 > x ? x1 + Math.abs(x - x1) : x1 - Math.abs(x - x1);
  let by = y1 + Math.abs(y - y1);

  while (data[by]?.[bx]) {
    antinodes.push({ x: bx, y: by });
    bx = x1 > x ? bx + Math.abs(x - x1) : bx - Math.abs(x - x1);
    by = by + Math.abs(y - y1);
  }

  return antinodes;
};

const setAntinodes = (data, antennas) => {
  const antennaCoordinateSets = antennas.values();
  const antinodes = new Set();

  const render = ({ x, y }) => {
    if (data[y]?.[x]) antinodes.add(`${x}|${y}`);
  }

  for (const antennaCoordinates of antennaCoordinateSets) {
    for (let i = 0; i < antennaCoordinates.length; i += 1) {
      for (let j = i + 1; j < antennaCoordinates.length; j += 1) {
        const srcAntinodes = getAntinodes(antennaCoordinates[i], antennaCoordinates[j], data);

        srcAntinodes.forEach(render);
      }
    }

    antennaCoordinates.forEach(render);
  }

  return antinodes;
}

async function run() {
  const input = await fs.readFile(filePath, "utf8");
  const data = parseInput(input);
  const antennas = scanAntennas(data);

  const antinodes = setAntinodes(data, antennas);

  console.log({ antinodes: antinodes.size });
}

run();
