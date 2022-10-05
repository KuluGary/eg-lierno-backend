const { getClasses } = require("../controllers/class");

const router = require("express").Router();

router.get("/classes/:id?", getClasses);

module.exports = router;
