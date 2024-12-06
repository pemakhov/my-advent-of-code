const fs = require("node:fs/promises");

const yearCwd = process.cwd();
const filePath = `${yearCwd}/04/input.txt`;

const isX = (i, j, data) => {
  const one = [data[i - 1]?.[j - 1], data[i + 1]?.[j + 1]]
  const two = [data[i - 1]?.[j + 1], data[i + 1]?.[j - 1]]

  return [one, two].every((pair) => pair.includes("M") && pair.includes("S"));
};

async function run() {
  const input = await fs.readFile(filePath, "utf8");
  const data = input.split("\n").map((x) => x.split(""));
  let counter = 0;

  for (i = 0; i < data.length; i += 1) {
    for (j = 0; j < data[i].length; j += 1) {
      if (data[i][j] === "A") counter += isX(i, j, data) ? 1 : 0;
    }
  }

  console.log(counter);
}

run();
