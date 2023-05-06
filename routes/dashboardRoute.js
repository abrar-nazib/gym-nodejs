const router = require("express").Router();

// Import Controllers
const {
  dashboardGetController,
} = require("../controllers/dashboardController");
const { searchGetController } = require("../controllers/searchController");

router.get("/", searchGetController);

module.exports = router;
