const router = require("express").Router();
const { postSpells, getSpells, postSpell } = require("../controllers/spell");

/** @deprecated */
router.post("/spells", postSpells);

router.get("/spells/:id?", getSpells);

router.post("/spell", postSpell);

module.exports = router;