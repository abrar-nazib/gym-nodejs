const router = require("express").Router();

const exerciseValidator = require("../../validator/exerciseValidator");
const {
  isUnAuthenticated,
  isAuthenticated,
} = require("../../middleware/authMiddleware");

const {
  exerciseGetController,
  exerciseCreateController,
  exerciseUpdateController,
  exerciseDeleteController,
  exerciseGetByIdController,
} = require("../controllers/exerciseController");

const { searchGetController } = require("../../controllers/searchController");

router.get("/", exerciseValidator, searchGetController);
router.get("/:id", isAuthenticated, exerciseGetByIdController);
router.post(
  "/",
  [isAuthenticated, exerciseValidator],
  exerciseCreateController
);
router.put("/", [isAuthenticated, exerciseValidator], exerciseUpdateController);
router.delete("/:id", isAuthenticated, exerciseDeleteController);
module.exports = router;
