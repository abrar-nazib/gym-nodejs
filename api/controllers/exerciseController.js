const Exercise = require("../../models/Exercise");
const { validationResult } = require("express-validator");
const errorFormatter = require("../../utils/validationErrorFormatter");

exports.exerciseGetController = async (req, res, next) => {
  try {
    let exercises = await Exercise.find().limit(50);
    res.render("pages/dashboard/dashboard", {
      title: "dashboard",
      exercises,
    });
  } catch (e) {
    next(e);
  }
};

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
    next(e);
  }
};
