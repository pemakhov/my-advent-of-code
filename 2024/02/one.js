const fs = require("node:fs");

const yearCwd = process.cwd();
const filePath = `${yearCwd}/02/input.txt`;

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const isReportSafe = (report) => {
    const isAscending = report[1] > report[0];

    for (let i = 1; i <= report.length; i += 1) {
      if (isAscending && (report[i - 1] >= report[i])) return false;
      if (!isAscending && (report[i - 1] <= report[i])) return false;
      if (Math.abs(report[i] - report[i - 1]) > 3) return false;
    }

    return true;
  }

  const reports = data.split("\n").map((row) => row.split(" ").map((x) => parseInt(x, 10)));
  const safeReports = reports.filter(isReportSafe);

  console.log(safeReports.length);
});
