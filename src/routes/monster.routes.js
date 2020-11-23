const express = require('express');
const router = express.Router();
const utils = require('../utils/utils');

let Monster = require('../models/monster');
let User = require('../models/user');
let Campaign = require('../models/campaign');

router.get('/bestiary', async (req, res) => {
    try {
        const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            let campaigns = await User.distinct("campaigns", { _id: decoded.userId })
            let campaignsDm = (await Campaign.distinct("_id", { dm: decoded.userId }))
                .map(campaign => campaign.toString());

            const monsters = await Monster.find({ "flavor.campaign": { $elemMatch: { $or: [{ campaignId: { $in: campaigns }, unlocked: true }, { campaignId: { $in: campaignsDm } }] } } })

            res.status(200).json({ payload: monsters })
        } else {
            res.status(500).json({ message })
        }
    } catch (e) {
        res.status(500).json({ message: "Error: " + e })
    }
})

router.get('/bestiary/:id', async (req, res) => {
    try {
        const { valid, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            const monster = await Monster.findById(req.params.id);

            res.status(200).json({ payload: monster })
        } else {
            res.status(500).json({ message })
        }

    } catch (e) {
        res.status(500).json({ message: "Error: " + e })
    }
})

router.post('/bestiary', async (req, res) => {
    try {
        const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            const monster = req.body;
            monster["createdBy"] = decoded["userId"];

            const newMonster = new Monster(monster);

            newMonster.save(function (err) {
                if (err) { return res.status(500).json({ message: "Error: " + err }) }

                res.status(200).json({ message: "Monstuo añadido correctamente" })
            })
        } else {
            res.status(500).json({ message });
        }
    } catch (err) {
        res.status(500).json({ message: "Error: " + err })
    }
})

router.put('/bestiary', async (req, res) => {
    try {
        const { valid, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            Monster.findByIdAndUpdate(req.body._id, req.body, function (err, monster) {
                if (err) {
                    return res.status(400).json({ message: 'El monstruo no ha podido ser modificado.' })
                }

                return res.status(200).json({ message: "Npc modificado" })
            })
        } else {
            res.status(500).json({ message });
        }
    } catch (e) {
        res.status(500).json({ message: 'Error: ' + e })
    }
})

router.delete('/bestiary/:id', async (req, res) => {
    try {
        const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            const monster = await Monster.findById(req.params.id);

            if (utils.validateOwnership(decoded.serId, monster.player)) {
                await Monster.findByIdAndDelete(req.params.id, function (err) {
                    return res.status(500).json({ message: "Error: " + err })
                })

                res.status(200).json({ message: "El monstruo ha sido eliminado" })
            } else {
                res.status(500).json({ message: "Discordancia entre usuario y propietario del monstruo." })
            }
        } else {
            res.status(500).json({ message })
        }
    } catch (error) {
        res.status(400).send('Error: ' + error)
    }
})


module.exports = router;

