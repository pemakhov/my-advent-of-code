const fs = require("node:fs/promises");

const YEAR_DIR = process.cwd();
const DAY = "07";
const filePath = `${YEAR_DIR}/${DAY}/input.txt`;

const parseInput = (input) => {
  return input
    .split("\n")
    .map((row) => {
      const [value, args] = row.split(": ");

      return {
        value: parseInt(value, 10),
        args: args.split(" "),
      };
    });
};

const operators = ["+", "*", "||"];

const isEquationTrue = (value, args) => {
  if (args.length === 1) {
    return eval(args.at(0)) === value;
  };

  const [firstArg, secondArg, ...rest] = args;

  for (const operator of operators) {
    if (
      isEquationTrue(
        value,
        [eval(`${firstArg}${operator === "||" ? "" : operator}${secondArg}`), ...rest],
      )
    ) return true;
  }

  return false;
}

async function run() {
  const input = await fs.readFile(filePath, "utf8");
  const data = parseInput(input);

  let sum = 0;

  for (const {value, args} of data) {
    sum += isEquationTrue(value, args) ? value : 0;
  }

  console.log({sum});
}

run();
