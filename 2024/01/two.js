const { a } = require("./input.js")

const [left, right] = a.reduce((acc, [x, y]) => {
  return [[...acc[0], x], [...acc[1], y]];
}, [[], []]);

const sorter = (x, y) => x - y;
left.sort(sorter)
right.sort(sorter)

const result = left.map((x, i) => right.filter((y) => y === x).length * x).reduce((acc, x) => acc + x, 0);

console.log(result);
