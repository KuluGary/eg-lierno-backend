const Monster = require("../models/monster");
const UserController = require("../controllers/user");

module.exports = {
    getPublicMonster: async () => {
        const superAdmins = await UserController.getAllAdmins();

        return await Monster.find({ "createdBy": { $in: superAdmins.map(admin => admin._id) } })
    }
}