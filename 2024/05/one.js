const fs = require("node:fs/promises");

const YEAR_DIR = process.cwd();
const DAY = "05";
const filePath = `${YEAR_DIR}/${DAY}/input.txt`;

const isPagesPairValid = ([a, b], update) => {
  const indexA = update.indexOf(a);
  const indexB = update.indexOf(b);

  if (indexA === -1 || indexB === -1) return true;

  return indexA < indexB;
}

const isUpdateValid = (update, pages) => {
  return pages.every((pair) => isPagesPairValid(pair, update));
}

async function run() {
  const input = await fs.readFile(filePath, "utf8");
  const [pagesSrc, updatesSrc] = input.split("\n\n");
  const pages = pagesSrc.split("\n").map((x) => x.split("|").map((a) => parseInt(a, 10)));
  const updates = updatesSrc.split("\n").map((x) => x.split(",").map((a) => parseInt(a, 10)));

  let validInputs = 0;
  let result = 0;

  for (const update of updates) {
    if (isUpdateValid(update, pages)) {
      validInputs += 1;
      result += update[Math.floor(update.length / 2)];
    }
  }

  console.log({ updates: updates.length, validInputs, result });
}

run();
