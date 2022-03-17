const express = require("express");
const router = express.Router();
const utils = require("../utils/utils");

let Location = require("../models/location");
const { getLocations } = require("../controllers/location");

router.get("/locations/:id?", getLocations);

router.get("/location/:id", async (req, res) => {
  try {
    const { valid, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const location = await Location.findById(req.params.id);

      res.status(200).json({ payload: location });
    } else {
      res.status(401).json({ message });
    }
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
});

router.get("/campaignmap/:id", async (req, res) => {
  try {
    const { valid, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const location = await Location.find({ campaign: req.params.id });

      res.status(200).json({ payload: location });
    } else {
      res.status(401).json({ message });
    }
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
});

module.exports = router;
