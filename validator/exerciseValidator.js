const { body } = require("express-validator");

module.exports = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name can not be empty")
    .isLength({ max: 50 })
    .withMessage("Name can not be more than 50 characters long")
    .trim(),
  body("bodyPart")
    .not()
    .isEmpty()
    .withMessage("Body part can not be empty")
    .isLength({ max: 100 })
    .withMessage("Body parts can not be more than 100 characters long")
    .trim(),
  body("equipment")
    .not()
    .isEmpty()
    .withMessage("Equipment can not be empty")
    .isLength({ max: 50 })
    .withMessage("Equipment can not be more than 50 characters long")
    .trim(),
  body("target")
    .not()
    .isEmpty()
    .withMessage("Target can not be empty")
    .isLength({ max: 50 })
    .withMessage("Target can not be more than 50 characters long")
    .trim(),
];
