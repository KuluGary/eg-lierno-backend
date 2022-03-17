const { getClasses } = require("../controllers/class");

const router = require("express").Router();

router.get("/classes", getClasses);

module.exports = router;
