const Class = require("../models/class");

module.exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find({});
    res.status(200).json({ payload: classes });
  } catch (error) {
    res.status(400).json({ message: "Error: " + error });
  }
};