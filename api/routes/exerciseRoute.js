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
  exerciseGetUniqueFieldsController,
} = require("../controllers/exerciseController");

const { searchGetController } = require("../../controllers/searchController");

router.get("/", exerciseGetController);
router.get("/unique", exerciseGetUniqueFieldsController);
router.get("/:id", isAuthenticated, exerciseGetByIdController);
router.post(
  "/",
  [isAuthenticated, exerciseValidator],
  exerciseCreateController
);
router.put("/", [isAuthenticated, exerciseValidator], exerciseUpdateController);
router.delete("/:id", isAuthenticated, exerciseDeleteController);
module.exports = router;
