const User = require("../models/user");

module.exports = {
    getAllAdmins: async (qs) => await User.find({ "role": "SUPER_ADMIN" })
}