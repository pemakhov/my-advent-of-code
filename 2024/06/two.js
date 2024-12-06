const fs = require("node:fs/promises");

const YEAR_DIR = process.cwd();
const DAY = "06";
const filePath = `${YEAR_DIR}/${DAY}/input.txt`;
const directions = ["up", "right", "down", "left"];

const cloneMap = (map) => map.map((row) => row.map((item) => ({ ...item, visitedDirections: [] })));

const getInitialPosition = (map) => {
  for (const row of map) {
    const found = row.find(({ value }) => value === "^");

    if (found) return found;
  }
};

const getNextPositionOrNull = (map, position, direction) => {
  const { x, y } = position;
  const getPositionOrNull = (x, y) => map[y]?.[x] || null;

  switch (direction) {
    case "up": return getPositionOrNull(x, y - 1);
    case "right": return getPositionOrNull(x + 1, y);
    case "down": return getPositionOrNull(x, y + 1);
    case "left": return getPositionOrNull(x - 1, y);
    default: throw new Error("Wrong direction!");
  }
};

const getNextDirection = (direction) => directions[(directions.indexOf(direction) + 1) % 4];

const isObstructionUseful = (map) => {
  const visitedPositions = new Set();
  let direction = "up";
  let nextPosition = getInitialPosition(map);

  while (nextPosition) {
    if (nextPosition.visitedDirections.includes(direction)) return true;

    const currentPosition = nextPosition;

    currentPosition.visitedDirections.push(direction);
    visitedPositions.add(currentPosition);
    nextPosition = getNextPositionOrNull(map, currentPosition, direction);

    while (nextPosition?.value === "#") {
      direction = getNextDirection(direction);
      nextPosition = getNextPositionOrNull(map, currentPosition, direction);
    }
  }

  return false;
}

async function run() {
  const startTime = Date.now();
  let obstructions = 0;
  const input = await fs.readFile(filePath, "utf8");
  const map = input
    .split("\n")
    .map((row, i) => row.split("")
    .map((value, j) => ({ value, x: j, y: i, visitedDirections: [] })));

  for (let i = 0; i < map.length; i += 1) {
    for (let j = 0; j < map[i].length; j += 1) {
      const current = map[i][j];
      if (current.value !== ".") {
        continue;
      }

      const currentMap = cloneMap(map);
      const obstruction = currentMap[i][j];

      obstruction.value = "#";

      if (isObstructionUseful(currentMap)) obstructions += 1;
    }
  }

  console.log({
    obstructions,
    durationSeconds: Math.round((Date.now() - startTime) / 1000),
  });
}

run();
