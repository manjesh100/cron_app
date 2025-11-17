const express = require('express');
const app = express();
const port = 5000;
//Cron Job start
//Can you change input Cron expression here to test with different values
const cronInput = "*/15 0 1,15 * 1-5 /usr/bin/find";
const FIELDS = [
  { name: "minute", min: 0, max: 59 },
  { name: "hour", min: 0, max: 23 },
  { name: "day of month", min: 1, max: 31 },
  { name: "month", min: 1, max: 12 },
  { name: "day of week", min: 0, max: 6 },
];
function expandField(field, min, max) {

  if (field.includes("/")) {
    const [left, step] = field.split("/");
    const s = parseInt(step);
    let start = min;
    if (left !== "*") start = parseInt(left.split("-")[0]);
    const result = [];
    for (let i = start; i <= max; i += s) {
      result.push(i);
    }
    return result;
  }
  if (field.includes("-")) {
    const [start, end] = field.split("-").map(Number);
    const result = [];
    for (let i = start; i <= end; i++) result.push(i);
    return result;
  }
  if (field.includes(",")) {
    return field.split(",").map(Number);
  }
  if (field === "*") {
    const result = [];
    for (let i = min; i <= max; i++) result.push(i);
    return result;
  }
  return [parseInt(field)];
}
function parseCron(cron) {
  const parts = cron.split(/\s+/);

  if (parts.length < 6) {
    console.error("Invalid cron expression (must include 5 fields + command).");
    process.exit(1);
  }
    const fields = parts.slice(0, 5);
    const command = parts.slice(5).join(" ");
    const parsed = {};
  fields.forEach((field, i) => {
    parsed[FIELDS[i].name] = expandField(field, FIELDS[i].min, FIELDS[i].max);
  });

  parsed["command"] = command;
  return parsed;
}

function printOutput(result) {
  Object.keys(result).forEach((key) => {
    const label = key.padEnd(14, " ");
    const value = Array.isArray(result[key])
      ? result[key].join(" ")
      : result[key];
    console.log(label + value);
  });
}
const parsed = parseCron(cronInput);
printOutput(parsed);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
