const router = require("express").Router();

const {
  getCharacters,
  getDmCharacters,
  putCharacters,
  deleteCharacters,
  postCharacters,
  getCharacterInfo,
  postUserCharacters,
  getUserCharacters,
  getCharacterSheet,
} = require("../controllers/character");

router.get("/characters/:id?", getCharacters);

router.get("/dm-characters", getDmCharacters);

router.put("/characters/:id", putCharacters);

router.delete("/characters/:id", deleteCharacters);

router.post("/characters", postCharacters);

router.post("/characterinfo", getCharacterInfo);

router.post("/usercharacter/", postUserCharacters);

router.get("/user/:id/characters", getUserCharacters);

router.get("/characters/sheet/pdf/:id", getCharacterSheet);

module.exports = router;
