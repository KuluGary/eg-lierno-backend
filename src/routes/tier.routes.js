const router = require("express").Router();
const { getTier, postTier, putTier, deleteTier, getTiers, getTierByCreature } = require("../controllers/tier.js");

router.get("/tier", getTiers);

router.get("/tier/:id", getTier);

router.get("/tier-by-creature", getTierByCreature);

router.post("/tier", postTier);

router.put("/tier/:id", putTier);

router.delete("/tier/:id", deleteTier);

module.exports = router;
