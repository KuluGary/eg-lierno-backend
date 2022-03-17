const router = require("express").Router();
const { getCampaigns, postCampaigns, putCampaigns } = require("../controllers/campaign");

router.get("/campaigns/:id?", getCampaigns);

router.post("/campaigns", postCampaigns);

router.put("/campaigns/:id", putCampaigns);

module.exports = router;
