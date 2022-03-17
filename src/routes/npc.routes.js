const router = require("express").Router();

const {
  getNpc,
  postNpc,
  putNpc,
  deleteNpc,
  postNpcInfo,
  getCampaignNpcs,
  getFactionNpcs,
  getNpcStatBlock,
} = require("../controllers/npc");

router.get("/npcs/:id?", getNpc);

router.post("/npc", postNpc);

router.put("/npc", putNpc);

router.delete("/npc/:id", deleteNpc);

router.post("/npcinfo", postNpcInfo);

router.get("/campaigns/:id/npcs", getCampaignNpcs);

router.get("/factions/:id/npcs", getFactionNpcs);

router.get("/npc/sheet/pdf/:id", getNpcStatBlock);

module.exports = router;
