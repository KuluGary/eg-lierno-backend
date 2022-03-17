const Campaign = require("../models/campaign");
const utils = require("../utils/utils");

module.exports.getCampaigns = async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      if (!!req.params.id) {
        const campaign = await Campaign.findById(req.params.id);

        res.status(200).json({ payload: campaign });
      } else {
        if (decoded.role === "SUPER_ADMIN") {
          const campaigns = await Campaign.find({});

          return res.status(200).json({ payload: campaigns });
        }

        const campaigns = await Campaign.find({
          $or: [{ players: { $all: [decoded.userId] } }, { dm: decoded.userId }],
        });

        res.status(200).json({ payload: campaigns });
      }
    } else {
      res.status(401).json({ message });
    }
  } catch (e) {
    res.status(400).json({ message: "Internal server error: " + e });
  }
};

module.exports.postCampaigns = async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const campaign = req.body;
      campaign["createdBy"] = decoded["userId"];

      const newCampaign = new Campaign(campaign);

      newCampaign.save(function (err) {
        if (err) {
          return res.json(500, { message: err });
        }

        res.status(200).json({ message: "Npc añadido correctamente" });
      });
    } else {
      res.status(401).json({ message });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports.putCampaigns = async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      Campaign.findOneAndUpdate({ _id: req.params.id, dm: decoded.userId }, req.body, { upsert: true }, (err) => {
        if (err) return res.status(403).json({ message: "La campaña no ha podido ser modificada." });

        return res.status(200).json({ message: "Campaña modificada" });
      });
    } else {
      res.status(401).json({ message });
    }
  } catch (e) {
    res.status(400).json({
      message: "La campaña no ha podido ser modificada.",
    });
  }
};
