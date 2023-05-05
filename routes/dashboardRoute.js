const router = require("express").Router();

// Import Controllers
const {
  dashboardGetController,
  dashboardGetSearchedController,
} = require("../controllers/dashboardController");

router.get("/", dashboardGetController);
router.get("/:query", dashboardGetSearchedController);

module.exports = router;
