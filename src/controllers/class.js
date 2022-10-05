const Class = require("../models/class");

module.exports.getClasses = async (req, res) => {
  try {
    if (!!req.params.id) {
      const classes = await Class.findById(req.params.id);

      res.status(200).json({ payload: classes });
    } else {
      const classes = await Class.find({}).sort({ name: 1 });
      res.status(200).json({ payload: classes });
    }
  } catch (error) {
    res.status(400).json({ message: "Error: " + error });
  }
};
