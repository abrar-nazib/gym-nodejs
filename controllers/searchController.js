const Exercise = require("../models/Exercise");

exports.searchGetController = async (req, res, next) => {
  let search = req.query.search;
  let currentPage = Math.abs(parseInt(req.query.page)) || 1;
  let itemPerPage = 20;
  try {
    if (!search || search === "") {
      let exercises = await Exercise.find({})
        .limit(itemPerPage)
        .skip(currentPage * itemPerPage - itemPerPage);
      let totalPost = await Exercise.countDocuments();
      let totalPage = totalPost / itemPerPage;
      return res.render("pages/dashboard/dashboard", {
        title: "Gym Dashboard",
        searchTerm: "",
        exercises,
        itemPerPage,
        currentPage,
        totalPage,
      });
    }

    let exercises = await Exercise.find({
      $text: { $search: search }, // $text means we are searching in text field
    })
      .skip(currentPage * itemPerPage - itemPerPage)
      .limit(itemPerPage);

    let totalPost = await Exercise.countDocuments({
      $text: { $search: search },
    });

    let totalPage = totalPost / itemPerPage;
    res.render("pages/dashboard/dashboard", {
      title: "Gym Dashboard",
      exercises,
      searchTerm: search,
      itemPerPage,
      currentPage,
      totalPage,
    });
  } catch (e) {
    next(e);
  }
};
