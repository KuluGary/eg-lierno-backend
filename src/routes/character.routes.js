const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || require('../configs/config');

let Character = require('../models/character');

router.get('/characters', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret.key);
        let characters;

        if (decoded.roles.some(role => role === "SUPER_ADMIN")) {
            characters = await Character.find({});
        } else {
            characters = await Character.find({ player: decoded.userId })
        }

        res.json({
            status: 200,
            message: "ok",
            payload: characters
        })
    } catch (e) {
        res.json({
            status: 500,
            message: "Internal server error"
        })
    }
})

router.get('/characters/:id', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret.key);

        if (decoded) {
            const character = await Character.findById(req.params.id);
            res.json({
                status: 200,
                message: "ok",
                payload: character
            })
        } else {
            res.json({
                status: 400,
                message: "Invalid JWT"
            })
        }
    } catch (e) {
        res.json({
            status: 500,
            message: "Internal server error"
        })
    }
})

router.get('/alignments', async (req, res) => {
    try {
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

        res.json({
            status: 200,
            message: "ok",
            payload: alignments
        })
    } catch (e) {
        res.json({
            status: 500,
            message: "Internal server error"
        })
    }
})

module.exports = router;