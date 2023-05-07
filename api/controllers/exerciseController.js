const Exercise = require("../../models/Exercise");
const { validationResult } = require("express-validator");
const errorFormatter = require("../../utils/validationErrorFormatter");

exports.exerciseCreateController = async (req, res, next) => {
  let { name, target, bodyPart, equipment } = req.body;
  let errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Exercise could not be created",
      success: false,
      errors: errors.mapped(),
    });
  }
  let exercise = new Exercise({ name, target, bodyPart, equipment });
  try {
    await exercise.save();
    res.status(201).json({
      message: "Exercise created successfully",
      success: true,
      exercise,
    });
  } catch (e) {
    next(e);
  }
};

exports.exerciseUpdateController = async (req, res, next) => {
  let { _id, name, target, bodyPart, equipment } = req.body;

  let errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped(), success: false });
  }
  try {
    let exercise = { _id, name, target, bodyPart, equipment };
    let updatedExercise = await Exercise.findOneAndUpdate(
      { _id },
      { $set: exercise },
      { new: true } // will return the newly updated document
    );
    res.status(201).json({
      message: "Exercise updated successfully",
      exercise: updatedExercise,
      success: true,
    });
  } catch (e) {
    next(e);
  }
};

exports.exerciseDeleteController = async (req, res, next) => {
  id = req.params.id;
  try {
    await Exercise.findOneAndDelete({ _id: id });
    res.status(200).json({
      message: "Exercise deleted successfully",
      success: true,
    });
  } catch (e) {
    next(e);
  }
};

exports.exerciseGetByIdController = async (req, res, next) => {
  let id = req.params.id;

  try {
    let exercise = await Exercise.findOne({ _id: id });
    res.status(200).json({
      message: "Exercise fetched successfully",
      success: true,
      exercise,
    });
  } catch (e) {
    res.status(500).json({ error: e.message, success: false });
    next(e);
  }
};

exports.exerciseGetController = async (req, res, next) => {
  try {
    const { target, bodyPart, equipment } = req.query;
    const filter = {
      target: target ? target : { $exists: true },
      bodyPart: bodyPart ? bodyPart : { $exists: true },
      equipment: equipment ? equipment : { $exists: true },
    };
    const itemPerPage = req.query.itemlimit || 50;
    const currentPage = Math.abs(parseInt(req.query.page)) || 1;
    let exercises = await Exercise.find(filter, {
      _id: 1,
      name: 1,
      bodyPart: 1,
      target: 1,
      equipment: 1,
      gifUrl: 1,
      // createdAt: 0,
      // updatedAt: 0,
    })
      .limit(itemPerPage)
      .skip(currentPage * itemPerPage - itemPerPage);
    let totalPost = await Exercise.countDocuments();
    let totalPage = totalPost / itemPerPage;

    res.status(200).json({
      message: "Exercise fetched successfully",
      success: true,
      exercises,
      itemPerPage,
      currentPage,
      totalPage,
    });
  } catch (e) {
    res.status(500).json({ error: e.message, success: false });
    next(e);
  }
};

exports.exerciseGetUniqueFieldsController = async (req, res, next) => {
  try {
    let targets = await Exercise.find().distinct("target");
    let bodyParts = await Exercise.find().distinct("bodyPart");
    let equipments = await Exercise.find().distinct("equipment");
    let uniqueFields = { targets, bodyParts, equipments };
    res.status(200).json({
      message: "Fields fetched successfully",
      success: true,
      uniqueFields,
    });
  } catch (e) {
    res.status(500).json({ error: e.message, success: false });
    next(e);
  }
};
