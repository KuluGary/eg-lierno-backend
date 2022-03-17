const router = require("express").Router();
const { postImage } = require("../controllers/image");

router.post("/image", postImage);

module.exports = router;
