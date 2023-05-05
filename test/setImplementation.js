const path = require("path"); // for file path operations
const fs = require("fs"); // for working with filesystems

// Load the data from the json file - synchronous file read for simplicity
dummyDbPath = path.join(__dirname, "../src/db/exercise.json");
const dummyDB = JSON.parse(fs.readFileSync(dummyDbPath, "utf8"));

// enumerate the unique body parts
bodyParts = new Set();
dummyDB.forEach((item) => {
  bodyParts.add(item.bodyPart);
});
// convert the set to an array
output = Array.from(bodyParts);
output.sort(); // sort the array alphabetically
console.log(output);
