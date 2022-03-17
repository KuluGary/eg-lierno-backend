const utils = require("../utils/utils");

const Faction = require("../models/faction");

module.exports.getCampaignFactions = async (req, res) => {
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
};

module.exports.getFaction = async (req, res) => {
  try {
    const factions = await Faction.findById(req.params.id);

    res.status(200).json({ payload: factions });
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
};

module.exports.putFaction = async (req, res) => {
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
};
