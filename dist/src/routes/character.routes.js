const express = require("express");
const router = express.Router();
const utils = require("../utils/utils");
const { redis } = require("../app");
const Character = require("../models/character");
const Campaign = require("../models/campaign");
const User = require("../models/user");
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
                    $or: [{ player: req.session.userId }, { _id: { $in: campaignCharacters } }],
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
                return res.status(200).json({ message: "Personaje modificado" });
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
                    return res.status(500).json({ message: "Error: " + err });
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
                { $unwind: "$name" },
                { $project: { name: "$name", _id: 1 } },
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
router.get("/discord/characters", async (req, res) => {
    try {
        const { valid, decoded, message } = utils.validateToken(req.headers.authorization);
        if (valid) {
            if (decoded.role == "SUPER_ADMIN") {
                const characters = await Character.find({});
                res.status(200).json({
                    payload: characters,
                });
            }
            else {
                res.status(401).json({
                    message: message,
                });
            }
        }
        else {
            res.status(401).json({
                message: message,
            });
        }
    }
    catch (error) {
        res.status(400).json({ message: "Error: " + error });
    }
});
router.get("/discord/character/:id", async (req, res) => {
    try {
        const { valid, message } = utils.validateToken(req.headers.authorization);
        if (valid) {
            const key = req.params.id;
            redis.get(`bot:${key}`, async (_, data) => {
                if (data) {
                    return res.status(200).json({ character: data });
                }
                const [authorId, channelId] = key.split("-");
                const campaign = await Campaign.findOne({
                    $or: [{ "discordData.main": channelId }, { "discordData.privadas": channelId }],
                });
                const user = await User.findOne({ "metadata.discordId": authorId });
                const character = await Character.findOne({
                    $and: [{ player: user._id }, { _id: { $in: campaign.characters } }],
                });
                const redisData = JSON.stringify({
                    id: character._id,
                    name: character.name,
                    avatar: character.flavor.portrait.avatar,
                });
                if (!!character) {
                    redis.set(`bot:${key}`, redisData, (err) => {
                        if (err)
                            return res.status(500).json({ message: "err" + err });
                        res.status(200).json({ character: redisData });
                    });
                }
                else {
                    res.status(500).json({ message: `No hay ningún usuario de ${user.username} en ${campaign.name}` });
                }
            });
        }
        else {
            res.status(401).json({
                message: message,
            });
        }
    }
    catch (e) {
        res.status(500).json({ message: "Error: " + e });
    }
    // const data = await redis.get(`bot:${key}`);
    // if (!!data) {
    //     return res.status(200).json({ data });
    // } else {
    //     redis.set(key, "test", (err, data) => {
    //         if (err) return res.status(500).json({ message: "err" + err });
    //         res.status(200).json({ message: "data set"})
    //     })
    // }
    // redis.set("bot:" + key, "test", redis.print);
});
module.exports = router;
//# sourceMappingURL=character.routes.js.map