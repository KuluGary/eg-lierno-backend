const express = require("express");
const router = express.Router();
const utils = require("../utils/utils");
const Character = require("../models/character");
const Campaign = require("../models/campaign");
const message = "No está autorizado para acceder a estos datos.";
router.get("/characters", async (req, res) => {
    try {
        if (req.session.userId) {
            let campaignsDm = await Campaign.find({ dm: req.session.userId });
            let campaignCharacters = [];
            campaignsDm.forEach((campaign) => campaignCharacters.push(...campaign.toJSON()["characters"]));
            let characters;
            if (req.session.role === "SUPER_ADMIN") {
                characters = await Character.find({});
            }
            else {
                characters = await Character.find({
                    $or: [
                        { player: req.session.userId },
                        { _id: { $in: campaignCharacters } },
                    ],
                });
            }
            res.status(200).json({ payload: characters });
        }
        else {
            res.status(401).json({ message });
        }
    }
    catch (error) {
        res.status(403).json({ message: "Error: " + error });
    }
});
router.put("/characters/:id", async (req, res) => {
    try {
        if (req.session.userId) {
            Character.findOneAndUpdate({ _id: req.params.id, player: req.session.userId }, req.body, null, function (err) {
                if (err)
                    return res.status(403).json({
                        message: "El personaje no ha podido ser modificado.",
                    });
                req.app.io.emit("updatedCharacter", { id: req.params.id });
                return res
                    .status(200)
                    .json({ message: "Personaje modificado" });
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
router.get("/characters/:id", async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        res.status(200).json({ payload: character });
    }
    catch (error) {
        res.status(400).json({ message: "Error: " + error });
    }
});
router.delete("/characters/:id", async (req, res) => {
    try {
        if (req.session.userId) {
            Character.findOneAndDelete({ _id: req.params.id, player: req.session.userId }, function (err) {
                if (err)
                    return res
                        .status(500)
                        .json({ message: "Error: " + err });
                res.status(200).json({
                    message: "El personaje ha sido eliminado",
                });
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
router.post("/characters", async (req, res) => {
    try {
        if (req.session.userId) {
            const character = req.body;
            character["player"] = req.session.userId;
            const newCharacter = new Character(character);
            newCharacter.save(function (err) {
                if (err) {
                    return res.status(403).json({ message: "Error: " + err });
                }
                res.status(200).json({ payload: newCharacter._id });
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
router.get("/alignments", async (req, res) => {
    try {
        if (req.session.userId) {
            const alignments = {
                advanced: [
                    [
                        { friendlyName: "Lawful Good", stat: 0 },
                        { friendlyName: "Social Good", stat: 1 },
                        { friendlyName: "Neutral Good", stat: 2 },
                        { friendlyName: "Rebel Good", stat: 3 },
                        { friendlyName: "Chaotic Good", stat: 4 },
                    ],
                    [
                        { friendlyName: "Lawful Moral", stat: 5 },
                        { friendlyName: "Social Moral", stat: 6 },
                        { friendlyName: "Neutral Moral", stat: 7 },
                        { friendlyName: "Rebel Moral", stat: 8 },
                        { friendlyName: "Chaotic Moral", stat: 9 },
                    ],
                    [
                        { friendlyName: "Lawful Neutral", stat: 10 },
                        { friendlyName: "Social Neutral", stat: 11 },
                        { friendlyName: "True Neutral", stat: 12 },
                        { friendlyName: "Rebel Neutral", stat: 13 },
                        { friendlyName: "Chaotic Neutral", stat: 14 },
                    ],
                    [
                        { friendlyName: "Lauwful Impure", stat: 15 },
                        { friendlyName: "Social Impure", stat: 16 },
                        { friendlyName: "Neutral Impure", stat: 17 },
                        { friendlyName: "Rebel Impure", stat: 18 },
                        { friendlyName: "Chaotic Impure", stat: 19 },
                    ],
                    [
                        { friendlyName: "Lawful Evil", stat: 20 },
                        { friendlyName: "Social Evil", stat: 21 },
                        { friendlyName: "Neutral Evil", stat: 22 },
                        { friendlyName: "Rebel Evil", stat: 23 },
                        { friendlyName: "Chaotic Evil", stat: 24 },
                    ],
                ],
                simple: [
                    [
                        { friendlyName: "Lawful Good", stat: 0 },
                        { friendlyName: "Neutral Good", stat: 2 },
                        { friendlyName: "Chaotic Good", stat: 4 },
                    ],
                    [
                        { friendlyName: "Lawful Neutral", stat: 10 },
                        { friendlyName: "True Neutral", stat: 12 },
                        { friendlyName: "Chaotic Neutral", stat: 14 },
                    ],
                    [
                        { friendlyName: "Lawful Evil", stat: 20 },
                        { friendlyName: "Neutral Evil", stat: 22 },
                        { friendlyName: "Chaotic Evil", stat: 24 },
                    ],
                ],
            };
            res.status(200).json({ payload: alignments });
        }
        else {
            res.status(401).json({ message });
        }
    }
    catch (error) {
        res.status(400).json({ message: "Error: " + error });
    }
});
router.post("/characterinfo", async (req, res) => {
    try {
        const { characterIds } = req.body;
        const characters = await Character.find({ _id: { $in: characterIds } });
        const payload = { characters };
        res.status(200).json({ payload });
    }
    catch (e) {
        res.status(400).json({ message: "Error: " + e });
    }
});
router.post("/usercharacter/", async (req, res) => {
    try {
        if (req.session.userId) {
            const { userIds } = req.body;
            const characters = await Character.aggregate([
                { $match: { player: { $in: userIds } } },
                { $unwind: "$flavor.traits.name" },
                { $project: { name: "$flavor.traits.name", _id: 1 } },
            ]);
            res.status(200).json({ payload: characters });
        }
        else {
            res.status(401).json({ message });
        }
    }
    catch (error) {
        res.status(400).json({ message: "Error: " + error });
    }
});
module.exports = router;
//# sourceMappingURL=character.routes.js.map