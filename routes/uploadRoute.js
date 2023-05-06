const router = require("express").Router();

const { uploadProfilePics } = require("../controllers/uploadController");
const upload = require("../middleware/uploadMiddleware");

router.post("/profilePics", upload.single("gifUrl"), uploadProfilePics);

module.exports = router;
