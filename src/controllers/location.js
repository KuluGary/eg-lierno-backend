const Location = require("../models/location");

module.exports.getLocations = async (req, res) => {
  try {
    const { valid, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const locations = await Location.find({});
      res.status(200).json({ payload: locations });
    } else {
      res.status(401).json({ message });
    }
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
};
