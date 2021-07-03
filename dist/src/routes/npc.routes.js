const express = require("express");
const router = express.Router();
let Npc = require("../models/npc");
let Campaign = require("../models/campaign");
router.get("/allnpcs/:campaignId", async (req, res) => {
    if (process.env.NODE_ENV === "development") {
        const campaignId = req.params.campaignId;
        let npcs = await Npc.find({});
        if (campaignId) {
            npcs = npcs.filter((npc) => npc.flavor.campaign.findIndex((campaign) => campaign.campaignId === campaignId) > -1);
        }
        return res.status(200).json({ npcs });
    }
    else {
        return res.status(403).json({ error: "No estás autorizado pra acceder a esta información." });
    }
});
router.get("/npc", async (req, res) => {
    try {
        if (req.session.userId) {
            let campaigns = (await Campaign.distinct("_id", { players: req.session.userId })).map((campaign) => campaign.toString());
            let campaignsDm = (await Campaign.distinct("_id", { dm: req.session.userId })).map((campaign) => campaign.toString());
            let npcs = await Npc.find({
                "flavor.campaign": {
                    $elemMatch: {
                        $or: [{ campaignId: { $in: campaigns }, unlocked: true }, { campaignId: { $in: campaignsDm } }],
                    },
                },
            }).sort({ name: 1 });
            res.status(200).json({
                payload: Array.from(new Set(npcs.map((a) => a.id))).map((id) => npcs.find((a) => a.id === id)),
            });
        }
        else {
            res.status(401).json({ message });
        }
    }
    catch (e) {
        res.status(400).json({ message: "Error: " + e });
    }
});
router.get("/npc/:id", async (req, res) => {
    try {
        const npc = await Npc.findById(req.params.id);
        res.status(200).json({ payload: npc });
    }
    catch (e) {
        res.status(400).json({ message: "Error: " + e });
    }
});
router.post("/npc", async (req, res) => {
    try {
        if (req.session.userId) {
            const npc = req.body;
            npc["createdBy"] = req.session["userId"];
            const newNpc = new Npc(npc);
            newNpc.save(function (err) {
                if (err) {
                    return res.status(403).json({ message: err });
                }
                res.status(200).json({
                    message: "Npc añadido correctamente",
                    value: newNpc._id,
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
router.put("/npc", async (req, res) => {
    try {
        if (req.session.userId) {
            Npc.findOneAndUpdate({ _id: req.body._id, createdBy: req.session.userId }, req.body, function (err) {
                if (err)
                    return res.status(401).json({ message: "Error: " + err });
                return res.status(200).json({ message: "Npc modificado" });
            });
        }
        else {
            res.status(400).json({ message });
        }
    }
    catch (e) {
        res.status(400).json({ message: "Error: " + e });
    }
});
router.delete("/npc/:id", async (req, res) => {
    try {
        if (req.session.userId) {
            Npc.findOneAndDelete({ _id: req.params.id, createdBy: req.session.userId }, function (err) {
                if (err)
                    return res.status(403).json({ message: "Error: " + err });
                return res.status(200).json({ message: "El PNJ ha sido eliminado" });
            });
        }
        else {
            res.status(401).json({ message });
        }
    }
    catch (error) {
        res.status(400).json({ message: "Error: " + error });
    }
});
router.post("/npcinfo", async (req, res) => {
    try {
        const { npcIds } = req.body;
        const npcs = await Npc.find({ _id: { $in: npcIds } });
        const payload = { npcs };
        res.status(200).json({ payload });
    }
    catch (e) {
        res.status(400).json({ message: "Error: " + e });
    }
});
module.exports = router;
//# sourceMappingURL=npc.routes.js.map