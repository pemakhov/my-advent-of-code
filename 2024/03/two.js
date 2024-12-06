const fs = require("node:fs");

const yearCwd = process.cwd();
const filePath = `${yearCwd}/03/input.txt`;

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const allowedData = data
    .split("don't()")
    .map((x, i) => {
      if (i === 0) return x;

      const doIndex = x.indexOf("do()");

      return doIndex === -1 ? "" : x.slice(doIndex);
    })
    .join("");

  const mulRegEx = new RegExp("mul\\(\\d+,\\d+\\)", "g");
  const instructions = allowedData.match(mulRegEx);
  const multipliers = instructions.map((x) => x.slice(4).split(",").map((y) => parseInt(y, 10)));

  const result = multipliers.reduce((acc, [x, y]) => acc + x * y, 0);

  console.log(result);
});
