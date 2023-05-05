const fs = require("fs");
const path = require("path");

// Load the data from the json file - synchronous file read for simplicity
const dummyDbPath = path.join(__dirname, "./exercise.json");
const dummyDB = JSON.parse(fs.readFileSync(dummyDbPath, "utf8"));

exports.bodyPartList = (req, res, next) => {
  // enumerate the unique body parts using a set
  bodyPartSet = new Set();
  dummyDB.forEach((item) => {
    bodyPartSet.add(item.bodyPart);
  });

  // convert the set to an array and sort it
  bodyPartList = Array.from(bodyPartSet);
  bodyPartList.sort(); // sort the array alphabetically
  res.send(bodyPartList);
};

exports.bodyPartByName = (req, res, next) => {
  const bodyPart = req.params.bodyPart;
  bodyPart.toLowerCase(); // convert the body part to lowercase for case insensitive search

  const results = dummyDB.filter((item) => item.bodyPart == bodyPart);
  if (results.length == 0) {
    res
      .status(404)
      .send({ error: "No exercises found for the given body part" });
  } else res.send(results);
};

exports.exerciseById = (req, res, next) => {
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
};

exports.exerciseByName = (req, res, next) => {
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
};

exports.targetList = (req, res, next) => {
  // enumerate the unique target muscles using a set
  targetMuscleSet = new Set();
  dummyDB.forEach((item) => {
    targetMuscleSet.add(item.target);
  });

  // convert the set to an array and sort it
  targetMuscleList = Array.from(targetMuscleSet);
  targetMuscleList.sort(); // sort the array alphabetically
  res.send(targetMuscleList);
};

exports.exerciseByTarget = (req, res, next) => {
  const target = req.params.target;
  target.toLowerCase(); // lowercase the target name for case insensitive match

  const results = dummyDB.filter((item) => item.target == target);
  if (results.length == 0) {
    res
      .status(404)
      .send({ error: "No exercises found for the given target muscle" });
  } else res.send(results);
};

exports.exerciseByEquipment = (req, res, next) => {
  const equipment = req.params.equipment;
  equipment.toLowerCase(); // lowercase the equipment name for case insensitive match

  const results = dummyDB.filter((item) => item.equipment == equipment);
  if (results.length == 0) {
    res
      .status(404)
      .send({ error: "No exercises found for the given equipment" });
  } else res.send(results);
};

exports.equipmentList = (req, res, next) => {
  // enumerate the unique equipments using a set
  equipmentSet = new Set();
  dummyDB.forEach((item) => {
    equipmentSet.add(item.equipment);
  });

  // convert the set to an array and sort it
  equipmentList = Array.from(equipmentSet);
  equipmentList.sort(); // sort the array alphabetically
  res.send(equipmentList);
};

exports.listExercises = (req, res, next) => res.send(dummyDB);
