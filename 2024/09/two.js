const fs = require("node:fs/promises");

const YEAR_DIR = process.cwd();
const DAY = "09";
const filePath = `${YEAR_DIR}/${DAY}/input.txt`;

const test = "2333133121414131402";

const format = (data) => data
  .split("")
  .map((x, i) => ({ id: i % 2 === 0 ? i / 2 : null, length: parseInt(x, 10) }))
  .filter(({ length }) => length !== 0);

const isFreeSpace = ({ id }) => id === null;

const compress = (data) => {
  for (let i = 0; i < data.length; i += 1) {
    if (!isFreeSpace(data[i])) continue;

    for (let j = data.length - 1; j > i; j -= 1) {
      if (isFreeSpace(data[j])) continue;
      if (data[j].length > data[i].length) continue;

      if (data[j].length === data[i].length) {
        data[i].id = data[j].id;
        data[j].id = null;

        break;
      }

      const temp = { ...data[j] };

      data[j].id = null;

      return compress([
        ...data.slice(0, i),
        temp,
        { id: null, length: data[i].length - temp.length },
        ...data.slice(i + 1),
      ]);
    }
  }

  return data;
};

const destructure = (data) => data
  .map(({ id, length }) => Array(length).fill(id === null ? "." : id))
  .flat();

const calcChecksum = (data) => data
  .reduce((acc, x, i) => x === "." ? acc : acc + (x * i), 0);

async function run() {
  const startedAt = Date.now();
  const input = await fs.readFile(filePath, "utf8");
  const disc = format(input);
  const compressed = compress(disc);
  const destructured = destructure(compressed);
  const checksum = calcChecksum(destructured);
  const durationSeconds = (Date.now() - startedAt) / 1000;

  console.log({ checksum, durationSeconds });
}

run();
