const express = require("express");
const router = express.Router();
const utils = require("../utils/utils");

let Npc = require("../models/npc");
let Campaign = require("../models/campaign");
let User = require("../models/user");

router.get("/npc", async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      let campaigns = (await Campaign.distinct("_id", { players: decoded.userId })).map((campaign) =>
        campaign.toString()
      );

      let campaignsDm = (await Campaign.distinct("_id", { dm: decoded.userId })).map((campaign) => campaign.toString());

      let npcs = await Npc.find({
        "flavor.campaign": {
          $elemMatch: {
            $or: [{ campaignId: { $in: campaigns }, unlocked: true }, { campaignId: { $in: campaignsDm } }],
          },
        },
      }).sort({ name: 1 });

      res
        .status(200)
        .json({ payload: Array.from(new Set(npcs.map((a) => a.id))).map((id) => npcs.find((a) => a.id === id)) });
    } else {
      res.status(401).json({ message });
    }
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
});

router.get("/fav-npc", async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const user = await User.findById(decoded.userId);

      if (user.favorites && user.favorites.npcs) {
        const npcs = await Npc.find({ _id: { $in: user.favorites.npcs } });

        res.status(200).json({ payload: npcs });
      } else {
        res.status(200).json({ payload: [] });
      }
    } else {
      res.status(401).json({ message });
    }
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
});

router.get("/npc/:id", async (req, res) => {
  try {
    const npc = await Npc.findById(req.params.id);

    res.status(200).json({ payload: npc });
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
});

router.post("/npc", async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const npc = req.body;
      npc["createdBy"] = decoded["userId"];

      const newNpc = new Npc(npc);

      newNpc.save(function (err) {
        if (err) {
          return res.status(403).json({ message: err });
        }

        res.status(200).json({ message: "Npc añadido correctamente", value: newNpc._id });
      });
    } else {
      res.status(401).json({ message });
    }
  } catch (err) {
    res.status(400).json({ message: "Error: " + err });
  }
});

router.put("/npc", async (req, res) => {
  try {
    const { valid, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      Npc.findByIdAndUpdate(req.body._id, req.body, function (err, npc) {
        if (err) {
          return res.status(401).json({ message: "Error: " + err });
        }
        return res.status(200).json({ message: "Npc modificado" });
      });
    } else {
      res.status(400).json({ message });
    }
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
});

router.delete("/npc/:id", async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const npc = await Npc.findById(req.params.id);

      if (utils.validateOwnership(decoded.userId, npc.createdBy)) {
        await Npc.findByIdAndDelete(req.params.id, function (err) {
          if (err) return res.status(403).json({ message: "Error: " + err });
          return res.status(200).json({ message: "El PNJ ha sido eliminado" });
        });
      } else {
        res.status(401).json({ message: "Este PNJ no es de tu propiedad." });
      }
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    res.status(400).json({ message: "Error: " + error });
  }
});

router.post("/npcinfo", async (req, res) => {
  try {
    const { npcIds } = req.body;

    const npcs = await Npc.find({ _id: { $in: npcIds } });

    const payload = { npcs };

    res.status(200).json({ payload });
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
});

router.get("/npcs", async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const npcs = await Npc.find(
        { createdBy: decoded["userId"] },
        { name: 1, "flavor.personality": 1, "flavor.portrait.avatar": 1 }
      );

      res.status(200).json({ payload: npcs });
    } else {
      res.status(401).json({ message });
    }
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
});

router.get("/campaigns/:id/npcs", async (req, res) => {
  try {
    const { valid, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const npcs = await Npc.find({ "flavor.campaign": { $elemMatch: { campaignId: req.params.id } } });

      res.status(200).json({ payload: npcs });
    } else {
      res.status(401).json({ message });
    }
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
});

module.exports = router;
