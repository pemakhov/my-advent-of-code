const fs = require("node:fs/promises");

const yearCwd = process.cwd();
const filePath = `${yearCwd}/04/input.txt`;

const findXmas = (i, j, data) => {
  let counter = 0;

  const directions = [
    [[0, 1], [0, 2], [0, 3]], // Right
    [[1, 0], [2, 0], [3, 0]], // Down
    [[1, 1], [2, 2], [3, 3]], // Diagonal down-right
    [[-1, 0], [-2, 0], [-3, 0]], // Up
    [[0, -1], [0, -2], [0, -3]], // Left
    [[-1, -1], [-2, -2], [-3, -3]], // Diagonal up-left
    [[1, -1], [2, -2], [3, -3]], // Diagonal down-left
    [[-1, 1], [-2, 2], [-3, 3]], // Diagonal up-right
  ];

  for (const direction of directions) {
    let sequence = "X";
    for (const [dx, dy] of direction) {
      const char = data[i + dy]?.[j + dx];
      if (!char) break;
      sequence += char;
    }
    if (sequence === "XMAS") counter += 1;
  }

  return counter;
};

async function run() {
  const input = await fs.readFile(filePath, "utf8");
  const data = input.split("\n").map((x) => x.split(""));
  let counter = 0;

  for (i = 0; i < data.length; i += 1) {
    for (j = 0; j < data[i].length; j += 1) {
      if (data[i][j] === "X") counter += findXmas(i, j, data);
    }
  }

  console.log(counter);
}

run();
