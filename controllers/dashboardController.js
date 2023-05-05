const Flash = require("../utils/Flash");
const Exercise = require("../models/Exercise");

exports.dashboardGetController = async (req, res, next) => {
  try {
    let exercises = await Exercise.find({}).limit(50).sort({ createdAt: -1 });
    // console.log(exercises);

    res.render("pages/dashboard/dashboard", {
      title: "My Dashboard",
      exercises: exercises,
    });
  } catch (e) {
    next(e);
  }
};

exports.dashboardGetSearchedController = async (req, res, next) => {
  // search for exercises from request parameter query
  // and render the dashboard page with the exercises
  let query = req.params.query;
  try {
    let exercises = await Exercise.find({
      $or: [{ name: query }, { name: { $regex: query, $options: "i" } }],
    }).limit(50);
    res.render("pages/dashboard/dashboard", {
      title: "My Dashboard",
      exercises: exercises,
    });
  } catch (e) {
    next(e);
  }
};
