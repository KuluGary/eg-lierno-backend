const controller = require("../../controllers/campaign");

module.exports = {
    campaigns: (root, { qs = "{}" }, context, info) => controller.getCampaigns(JSON.parse(qs)),
    campaign: () => "Hello world"
}