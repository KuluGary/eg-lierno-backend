const Class = require("../../models/class");

module.exports = {
    getAllClasses: () => Class.find({ })
}