const Campaign = require("../models/campaign");
module.exports = {
    getCampaigns: async (qs) => await Campaign.find(qs)
};
//# sourceMappingURL=campaign.js.map