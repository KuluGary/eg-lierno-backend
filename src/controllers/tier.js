const Tier = require("../models/tier");
const Npc = require("../models/npc");
const Character = require("../models/character");
const utils = require("../utils/utils");

module.exports.getTier = async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const tier = await Tier.findOne({ _id: req.params.id, createdBy: decoded.userId });

      if (!tier) return res.status(400).json({ message: "No tier found with this ID for this user." });

      return res.status(200).json({ payload: tier });
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getTiers = async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const tiers = await Tier.find({ createdBy: decoded.userId });

      return res.status(200).json({ payload: tiers });
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports.getTierByCreature = async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const { id, type } = req.query;

      let payload = {};

      if (type === "npc") {
        payload = await Npc.find({ "flavor.group": id }, { _id: 1, "stats.challengeRating": 1 }).sort({
          "stats.challengeRating": 1,
        });
      } else if (type === "character") {
        payload = await Character.find({ "flavor.group": id, createdBy: decoded.userId }, { _id: 1 });
      }

      res.status(200).json({ payload });
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports.postTier = async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const tier = req.body;
      tier["createdBy"] = decoded["userId"];
      const newTier = new Tier(tier);

      newTier.save((err) => {
        if (err) return res.status(403).json({ message: "Error: " + err });

        res.status(200).json({ payload: newTier._id });
      });
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.putTier = async (req, res) => {
  const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

  if (valid) {
    if (utils.validateOwnership(decoded.userId, tier.createdBy)) {
      Tier.findOneAndUpdate({ _id: req.params.id, createdBy: decoded.userId }, req.body, (err, tier) => {
        if (err) return res.status(401).json({ message: "Error: " + err });

        return res.status(200).json({ message: "Tier modificado" });
      });
    }
  } else {
    res.status(401).json({ message });
  }
};

module.exports.deleteTier = async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      await Tier.findOneAndDelete({ _id: req.params.id, createdBy: decoded.userId }, (err) => {
        if (err) return res.status(403).json({ message: "Error: " + err });

        return res.status(200).json({ message: "El tier ha sido eliminado" });
      });
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
