const fs = require("node:fs/promises");

const YEAR_DIR = process.cwd();
const DAY = "09";
const filePath = `${YEAR_DIR}/${DAY}/input.txt`;

const test = "2333133121414131402";

const format = (data) => data
  .split("")
  .map((x, i) => Array(parseInt(x, 10)).fill(i % 2 === 0 ? i / 2 : "."))
  .flat();

const isFreeSpace = (element) => element === ".";

const compress = (data) => {
  for (let i = 0; i < data.length; i += 1) {
    if (!isFreeSpace(data[i])) continue;

    const lastElementIndex = data.findLastIndex((x) => !isFreeSpace(x))

    if (lastElementIndex > i) {
      data[i] = data[lastElementIndex];
      data[lastElementIndex] = ".";
    }
  }

  return data;
};

const calcChecksum = (data) => data
  .slice(0, data.indexOf("."))
  .reduce((acc, x, i) => isFreeSpace(x) ? acc : acc + (x * i), 0);

async function run() {
  const startedAt = Date.now();
  const input = await fs.readFile(filePath, "utf8");
  const disc = format(input);
  const compressed = compress(disc);
  const checksum = calcChecksum(compressed);
  const durationSeconds = (Date.now() - startedAt) / 1000;

  console.log({ checksum, durationSeconds });
}

run();
