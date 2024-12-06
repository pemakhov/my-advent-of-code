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

const fixUpdate = (update, pages) => {
  const fixed = [...update];

  while (!isUpdateValid(fixed, pages)) {
    for (const pair of pages) {
      if (!isPagesPairValid(pair, fixed)) {
        const indexA = fixed.indexOf(pair[0]);
        const indexB = fixed.indexOf(pair[1]);

        if (indexA !== -1 && indexB !== -1) {
          // Swap the elements
          [fixed[indexA], fixed[indexB]] = [fixed[indexB], fixed[indexA]];
        }
      }
    }
  }

  return fixed;
};

async function run() {
  const input = await fs.readFile(filePath, "utf8");
  const [pagesSrc, updatesSrc] = input.split("\n\n");
  const pages = pagesSrc.split("\n").map((x) => x.split("|").map((a) => parseInt(a, 10)));
  const updates = updatesSrc.split("\n").map((x) => x.split(",").map((a) => parseInt(a, 10)));

  let result = 0;

  const invalidUpdates = updates.filter((update) => !isUpdateValid(update, pages));

  for (const update of invalidUpdates) {
    const fixedUpdate = fixUpdate(update, pages);

    console.log({ isFixed: isUpdateValid(fixedUpdate, pages)})

    result += fixedUpdate[Math.floor(fixedUpdate.length / 2)];
  }

  console.log({ updates: updates.length, result });
}

run();
