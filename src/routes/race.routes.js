const router = require("express").Router();
const { getRaces } = require("../controllers/race");

router.get("/races/:id", getRaces);

module.exports = router;