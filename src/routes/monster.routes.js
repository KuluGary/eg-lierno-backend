const router = require("express").Router();
const {
  getBestiary,
  postBestiary,
  putBestiary,
  deleteBestiary,
  postMonsterInfo,
  getCampaignMonsters,
} = require("../controllers/monster");

router.get("/bestiary/:id?", getBestiary);

router.post("/bestiary", postBestiary);

router.put("/bestiary", putBestiary);

router.delete("/bestiary/:id", deleteBestiary);

router.post("/monsterinfo", postMonsterInfo);

router.get("/campaigns/:id/monsters", getCampaignMonsters);

module.exports = router;
