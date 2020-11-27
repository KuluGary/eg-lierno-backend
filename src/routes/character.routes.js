const express = require('express');
const router = express.Router();
const utils = require('../utils/utils');

let Character = require('../models/character');
let Campaign = require('../models/campaign');

router.get('/characters', async (req, res) => {
    try {
        const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            let campaignsDm = (await Campaign.find({ "dm": decoded.userId }))
            let campaignCharacters = [];
            campaignsDm.forEach(campaign => campaignCharacters.push(...campaign.toJSON()["characters"]))

            let characters;

            if (decoded.roles.includes("SUPER_ADMIN")) {
                characters = await Character.find({});
            } else {
                characters = await Character.find({
                    $or: [{ player: decoded.userId }, { "_id": { $in: campaignCharacters } }]
                });
            }

            res.status(200).json({ payload: characters })
        } else {
            res.status(500).json({ message })
        }
    } catch (error) {
        res.status(500).json({ message: "Error: " + error })
    }
})

router.put('/characters/:id', async (req, res) => {
    try {
        const { valid, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            await Character.findByIdAndUpdate(req.params.id, req.body, function (err) {
                if (err) {
                    return res.status(500).json({ message: 'El personaje no ha podido ser modificado.' })
                }
                req.app.io.emit('updatedCharacter', { id: req.params.id })
                return res.status(200).json({ message: 'Personaje modificado' })
            })
        } else {
            res.status(500).json({ message })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error: ' + error })
    }
})

router.get('/characters/:id', async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);

        res.status(200).json({ payload: character })
    } catch (error) {
        res.status(500).json({ message: 'Error: ' + error })
    }
})

router.delete('/characters/:id', async (req, res) => {
    try {
        const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            const character = await Character.findById(req.params.id);

            if (utils.validateOwnership(decoded.userId, character.player)) {
                await Character.findByIdAndDelete(req.params.id, function (err) {
                    return res.status(500).json({ message: "Error: " + err })
                })

                res.status(200).json({ message: "El personaje ha sido eliminado" })
            } else {
                res.status(500).json({ message: "Discordancia entre usuario y propietario del personaje." })
            }
        } else {
            res.status(500).json({ message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error: ' + error })
    }
})

router.get('/alignments', async (req, res) => {
    try {
        const { valid, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            const alignments = {
                "advanced": [
                    [
                        { "friendlyName": "Lawful Good", "stat": 0 },
                        { "friendlyName": "Social Good", "stat": 1 },
                        { "friendlyName": "Neutral Good", "stat": 2 },
                        { "friendlyName": "Rebel Good", "stat": 3 },
                        { "friendlyName": "Chaotic Good", "stat": 4 }
                    ],
                    [
                        { "friendlyName": "Lawful Moral", "stat": 5 },
                        { "friendlyName": "Social Moral", "stat": 6 },
                        { "friendlyName": "Neutral Moral", "stat": 7 },
                        { "friendlyName": "Rebel Moral", "stat": 8 },
                        { "friendlyName": "Chaotic Moral", "stat": 9 }
                    ],
                    [
                        { "friendlyName": "Lawful Neutral", "stat": 10 },
                        { "friendlyName": "Social Neutral", "stat": 11 },
                        { "friendlyName": "True Neutral", "stat": 12 },
                        { "friendlyName": "Rebel Neutral", "stat": 13 },
                        { "friendlyName": "Chaotic Neutral", "stat": 14 }
                    ],
                    [
                        { "friendlyName": "Lauwful Impure", "stat": 15 },
                        { "friendlyName": "Social Impure", "stat": 16 },
                        { "friendlyName": "Neutral Impure", "stat": 17 },
                        { "friendlyName": "Rebel Impure", "stat": 18 },
                        { "friendlyName": "Chaotic Impure", "stat": 19 }
                    ],
                    [
                        { "friendlyName": "Lawful Evil", "stat": 20 },
                        { "friendlyName": "Social Evil", "stat": 21 },
                        { "friendlyName": "Neutral Evil", "stat": 22 },
                        { "friendlyName": "Rebel Evil", "stat": 23 },
                        { "friendlyName": "Chaotic Evil", "stat": 24 }
                    ]
                ],
                "simple": [
                    [
                        { "friendlyName": "Lawful Good", "stat": 0 },

                        { "friendlyName": "Neutral Good", "stat": 2 },

                        { "friendlyName": "Chaotic Good", "stat": 4 }
                    ],
                    [
                        { "friendlyName": "Lawful Neutral", "stat": 10 },

                        { "friendlyName": "True Neutral", "stat": 12 },

                        { "friendlyName": "Chaotic Neutral", "stat": 14 }
                    ],
                    [
                        { "friendlyName": "Lawful Evil", "stat": 20 },

                        { "friendlyName": "Neutral Evil", "stat": 22 },

                        { "friendlyName": "Chaotic Evil", "stat": 24 }
                    ]
                ]
            }

            res.status(200).json({ payload: alignments })
        } else {
            res.status(500).json({ message });
        }
    } catch (error) {
        res.status(500).json({ message: "Error: " + error })
    }
})

router.post('/characterinfo', async (req, res) => {
    try {
        const { valid, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            const { characterIds } = req.body;

            const characters = await Character.find({ _id: { $in: characterIds } });

            const payload = {
                characters
            }

            res.status(200).json({ payload })
        } else {
            res.status(500).json({ message })
        }
    } catch (e) {
        res.status(500).json({ message: "Error: " + error })
    }
})

router.post('/usercharacter/', async (req, res) => {
    try {
        const { valid, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            const { userIds } = req.body;

            const characters = await Character.aggregate([
                { $match: { player: { $in: userIds } } },
                { $unwind: "$flavor.traits.name" },
                { $project: { name: "$flavor.traits.name", _id: 1 } }
            ])

            res.status(200).json({ payload: characters })

        } else {
            res.status(500).json({ message });
        }
    } catch (error) {
        res.status(500).json({ message: "Error: " + error });
    }
})

module.exports = router;