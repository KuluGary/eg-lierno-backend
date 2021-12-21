const express = require("express");
const router = express.Router();
const utils = require("../utils/utils");

let Faction = require("../models/faction");

router.get("/campaigns/factions/:id", async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      if (decoded.role === "SUPER_ADMIN") {
        const campaigns = await Campaign.find({});

        return res.status(200).json({ payload: campaigns });
      }

      const factions = await Faction.find({
        $and: [{ campaigns: req.params.id }, { $or: [{ unlocked: true }, { createdBy: decoded.userId }] }],
      });

      res.status(200).json({ payload: factions });
    } else {
      res.status(401).json({ message });
    }
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
});

router.get("/factions", async (req, res) => {
  try {
    const { valid, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const factions = await Faction.find({});

      res.status(200).json({ payload: factions });
    } else {
      res.status(401).json({ message });
    }
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
});

router.get("/factions/:id", async (req, res) => {
  try {
    const factions = await Faction.findById(req.params.id);

    res.status(200).json({ payload: factions });
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
});

router.put("/factions/:id", async (req, res) => {
  try {
    const { valid, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      await Faction.findByIdAndUpdate(req.params.id, req.body, function (err, facción) {
        if (err) {
          return res.status(403).json({ message: "La facción no ha podido ser modificada" });
        }

        return res.status(200).json({ message: "Facción modificada" });
      });
    } else {
      res.status(401).json({ message });
    }
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
});

module.exports = router;
