const Npc = require("../models/npc");
const UserController = require("../controllers/user");
module.exports = {
    getPublicNpc: async (error) => {
        const superAdmins = await UserController.getAllAdmins();
        return await Npc.find({ "createdBy": { $in: superAdmins } });
    }
};
//# sourceMappingURL=npc.js.map