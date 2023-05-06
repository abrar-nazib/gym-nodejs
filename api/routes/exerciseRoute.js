const router = require("express").Router();

const exerciseValidator = require("../../validator/exerciseValidator");

const {
  exerciseGetController,
  exerciseCreateController,
  exerciseUpdateController,
  exerciseDeleteController,
  exerciseGetByIdController,
} = require("../controllers/exerciseController");

router.get("/", exerciseValidator, exerciseGetController);
router.get("/:id", exerciseGetByIdController);
router.post("/", exerciseValidator, exerciseCreateController);
router.put("/", exerciseValidator, exerciseUpdateController);
router.delete("/:id", exerciseDeleteController);
module.exports = router;
