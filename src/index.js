// a nodejs basic server with express
const express = require("express"); // For setting up the server
const app = express();
const fs = require("fs"); // for working with filesystems
const path = require("path"); // for file path operations

// express server customizations
app.use(express.json()); // for parsing application/json requests

const port = process.env.PORT || 3000; // If process.env.PORT is not defined, use port 3000

// Load the data from the json file - synchronous file read for simplicity
dummyDbPath = path.join(__dirname, "./db/exercise.json");
const dummyDB = JSON.parse(fs.readFileSync(dummyDbPath, "utf8"));

/*
------------------------------------------------------------------------------------------------------------------------
 1. API endpoint to list unique body parts
    example requests to this endpoint:
    http://localhost:3000/exercises/bodyPartList
*/
app.get("/exercises/bodyPartList", (req, res) => {
  // enumerate the unique body parts using a set
  bodyPartSet = new Set();
  dummyDB.forEach((item) => {
    bodyPartSet.add(item.bodyPart);
  });

  // convert the set to an array and sort it
  bodyPartList = Array.from(bodyPartSet);
  bodyPartList.sort(); // sort the array alphabetically
  res.send(bodyPartList);
});

/*
------------------------------------------------------------------------------------------------------------------------
 2. API endpoint to list exercises by body part
    example requests to this endpoint:
    http://localhost:3000/exercises/bodyPart/waist
*/
app.get("/exercises/bodyPart/:bodyPart", (req, res) => {
  const bodyPart = req.params.bodyPart;
  bodyPart.toLowerCase(); // convert the body part to lowercase for case insensitive search

  const results = dummyDB.filter((item) => item.bodyPart == bodyPart);
  if (results.length == 0) {
    res
      .status(404)
      .send({ error: "No exercises found for the given body part" });
  } else res.send(results);
});

/*
------------------------------------------------------------------------------------------------------------------------
 3. API endpoint for getting exercise by id
    example requests to this endpoint:
    http://localhost:3000/exercises/exercise/34
*/
app.get("/exercises/exercise/:id", (req, res) => {
  const id = req.params.id;
  // validate whether the id is a number
  if (isNaN(id)) {
    res
      .status(400)
      .send({ error: "Invalid data type for id. It has to be a number" });
    return;
  }

  // filter the data based on id
  const results = dummyDB.filter((item) => parseInt(item.id) == parseInt(id));
  // explaination for parseInt(item.id) == parseInt(id): without parseInt, the comparison will be string comparison. 0023 and 23 will be considered different

  if (results.length == 0) {
    res.status(404).send({ error: "No exercise found with the given id" });
  } else {
    res.send(results[0]); // return the first result if multiple results are found
  }
});

/*
------------------------------------------------------------------------------------------------------------------------
4. API endpoint for fetching exercises by name
    example requests to this endpoint:
    http://localhost:3000/exercises/name/leg%20deadlift
*/
app.get("/exercises/name/:query", (req, res) => {
  const query = req.params.query;
  query.toLowerCase(); // convert the query to lowercase for case insensitive search

  // simple search for exact match
  //   const results = dummyDB.filter((item) => item.name == name);

  // search for all possible matches: case insensitive
  const words = query.split(" "); // split the query into words
  const results = dummyDB.filter((item) => {
    return words.every((word) => {
      // find match for every word
      return item.name.toLowerCase().includes(word);
    });
  });

  if (results.length == 0) {
    res.status(404).send({ error: "No exercise found with the given name" });
  } else {
    res.send(results);
  }
});

/*
------------------------------------------------------------------------------------------------------------------------
5. API endpoint for Listing Target Muscles */
app.get("/exercises/targetList", (req, res) => {
  // enumerate the unique target muscles using a set
  targetMuscleSet = new Set();
  dummyDB.forEach((item) => {
    targetMuscleSet.add(item.target);
  });

  // convert the set to an array and sort it
  targetMuscleList = Array.from(targetMuscleSet);
  targetMuscleList.sort(); // sort the array alphabetically
  res.send(targetMuscleList);
});

/*
------------------------------------------------------------------------------------------------------------------------
6. API endpoint for Listing Exercises by Target Muscle
    example requests to this endpoint:
    http://localhost:3000/exercises/target/abs
*/
app.get("/exercises/target/:target", (req, res) => {
  const target = req.params.target;
  target.toLowerCase(); // lowercase the target name for case insensitive match

  const results = dummyDB.filter((item) => item.target == target);
  if (results.length == 0) {
    res
      .status(404)
      .send({ error: "No exercises found for the given target muscle" });
  } else res.send(results);
});

/*
------------------------------------------------------------------------------------------------------------------------
7. API endpoint for Listing all exercises 
    example requests to this endpoint:
    http://localhost:3000/exercises
*/
app.get("/exercises", (req, res) => res.send(dummyDB));

/*
------------------------------------------------------------------------------------------------------------------------
8. API endpoint for listing by equipment
    example requests to this endpoint:
    http://localhost:3000/exercises/equipment/barbell'
*/
app.get("/exercises/equipment/:equipment", (req, res) => {
  const equipment = req.params.equipment;
  equipment.toLowerCase(); // lowercase the equipment name for case insensitive match

  const results = dummyDB.filter((item) => item.equipment == equipment);
  if (results.length == 0) {
    res
      .status(404)
      .send({ error: "No exercises found for the given equipment" });
  } else res.send(results);
});

/*
------------------------------------------------------------------------------------------------------------------------
9. API endpoint for listing all Equipments
    example requests to this endpoint:
    http://localhost:3000/exercises/equipmentList
*/
app.get("/exercises/equipmentList", (req, res) => {
  // enumerate the unique equipments using a set
  equipmentSet = new Set();
  dummyDB.forEach((item) => {
    equipmentSet.add(item.equipment);
  });

  // convert the set to an array and sort it
  equipmentList = Array.from(equipmentSet);
  equipmentList.sort(); // sort the array alphabetically
  res.send(equipmentList);
});

/*
------------------------------------------------------------------------------------------------------------------------
10. API endpoint for 404 error handling
*/
app.get("*", (req, res) => {
  res.status(404).send({ error: "404 - Page Not Found." });
});

app.listen(port, () => console.log(`Exercise app listening on port ${port}!`)); // start the server at specified port.
