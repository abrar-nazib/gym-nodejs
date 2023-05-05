const path = require("path"); // for file path operations
const fs = require("fs"); // for working with filesystems

// Load the data from the json file - synchronous file read for simplicity
dummyDbPath = path.join(__dirname, "../src/db/exercise.json");
const dummyDB = JSON.parse(fs.readFileSync(dummyDbPath, "utf8"));

// filter the data based on id

filterById = (id) => {
  // dummyDB is basically an array. so Array.filter() function is useful
  const results = dummyDB.filter((item) => {
    return item.id == id;
  });
  return results[0];
};

console.log(filterById(34));
