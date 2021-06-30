const express = require("express");
const router = express.Router();
const utils = require("../utils/utils");
let Monster = require("../models/monster");
let User = require("../models/user");
let Campaign = require("../models/campaign");
router.get("/bestiary", async (req, res) => {
    try {
        if (req.session.userId) {
            let campaigns = await User.distinct("campaigns", {
                _id: req.session.userId,
            });
            let campaignsDm = (await Campaign.distinct("_id", { dm: req.session.userId })).map((campaign) => campaign.toString());
            const monsters = await Monster.find({
                "flavor.campaign": {
                    $elemMatch: {
                        $or: [
                            { campaignId: { $in: campaigns }, unlocked: true },
                            { campaignId: { $in: campaignsDm } },
                        ],
                    },
                },
            });
            res.status(200).json({ payload: monsters });
        }
        else {
            res.status(401).json({ message });
        }
    }
    catch (e) {
        res.status(400).json({ message: "Error: " + e });
    }
});
router.get("/bestiary/:id", async (req, res) => {
    try {
        const monster = await Monster.findById(req.params.id);
        res.status(200).json({ payload: monster });
    }
    catch (e) {
        res.status(400).json({ message: "Error: " + e });
    }
});
router.post("/bestiary", async (req, res) => {
    try {
        if (req.session.userId) {
            const monster = req.body;
            monster["createdBy"] = req.session["userId"];
            const newMonster = new Monster(monster);
            newMonster.save(function (err) {
                if (err) {
                    return res.status(403).json({ message: "Error: " + err });
                }
                res.status(200).json({
                    message: "Monstruo añadido correctamente",
                });
            });
        }
        else {
            res.status(401).json({ message });
        }
    }
    catch (err) {
        res.status(400).json({ message: "Error: " + err });
    }
});
router.put("/bestiary", async (req, res) => {
    try {
        if (req.session.userId) {
            Monster.findOneAndUpdate({ _id: req.body._id, createdBy: req.session.userId }, req.body, function (err) {
                if (err)
                    return res.status(403).json({
                        message: "El monstruo no ha podido ser modificado",
                    });
            });
            return res.status(200).json({ message: "Monstruo modificado" });
        }
        else {
            res.status(401).json({ message });
        }
    }
    catch (e) {
        res.status(400).json({ message: "Error: " + e });
    }
});
router.delete("/bestiary/:id", async (req, res) => {
    try {
        if (req.session.userId) {
            Monster.findOneAndDelete({ _id: req.params.id, createdBy: req.session.userId }, function (err) {
                if (err)
                    return res
                        .status(403)
                        .json({ message: "Error " + err });
                return res
                    .status(200)
                    .json({ message: "El monstruo ha sido eliminado" });
            });
        }
        else {
            res.status(401).json({ message });
        }
    }
    catch (error) {
        res.status(400).send("Error: " + error);
    }
});
router.post("/monsterinfo", async (req, res) => {
    try {
        const { monsterIds } = req.body;
        const monsters = await Monster.find({ _id: { $in: monsterIds } });
        const payload = { monsters };
        res.status(200).json({ payload });
    }
    catch (e) {
        res.status(400).json({ message: "Error: " + e });
    }
});
module.exports = router;
//# sourceMappingURL=monster.routes.js.map