const router = require("express").Router();
const { getCampaignFactions, getFaction, putFaction } = require("../controllers/faction");

router.get("/campaigns/factions/:id", getCampaignFactions);

router.get("/factions/:id", getFaction);

router.put("/factions/:id", putFaction);

module.exports = router;