const fs = require("node:fs/promises");

const YEAR_DIR = process.cwd();
const DAY = "06";
const filePath = `${YEAR_DIR}/${DAY}/input.txt`;

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

const directions = ["up", "right", "down", "left"];
const getNextDirection = (direction) => directions[(directions.indexOf(direction) + 1) % 4];

async function run() {
  const input = await fs.readFile(filePath, "utf8");
  const map = input
    .split("\n")
    .map((row, i) => row.split("")
    .map((value, j) => ({ value, x: j, y: i })));

  let direction = "up"; // up, right, down, left
  const initialPosition = getInitialPosition(map);
  const visitedPositions = new Set([initialPosition]);

  let nextPosition = getNextPositionOrNull(map, initialPosition, direction);

  while (nextPosition) {
    const currentPosition = nextPosition;

    visitedPositions.add(currentPosition);
    nextPosition = getNextPositionOrNull(map, currentPosition, direction);

    while (nextPosition?.value === "#") {
      direction = getNextDirection(direction);
      nextPosition = getNextPositionOrNull(map, currentPosition, direction);
    }
  }

  console.log({ count: visitedPositions.size });
}

run();
