const Exercise = require("../models/Exercise");

exports.dashboardGetController = async (req, res, next) => {
  try {
    let exercises = await Exercise.find({}).limit(20);
    res.render("pages/dashboard/dashboard", {
      title: "dashboard",
      exercises,
    });
  } catch (e) {
    next(e);
  }
};
