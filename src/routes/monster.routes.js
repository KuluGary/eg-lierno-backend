const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = require('../configs/config');

let Monster = require('../models/monster');
let User = require('../models/user');
let Campaign = require('../models/campaign');


router.get('/bestiary', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret.key);

        if (decoded) {
            let campaigns = await User.distinct("campaigns", { _id: decoded.userId })
            let campaignsDm = (await Campaign.distinct("_id", { dm: decoded.userId }))
                .map(campaign => campaign.toString());
            const monsters = await Monster.find({ "flavor.campaign": { $elemMatch: { $or: [{ campaignId: { $in: campaigns }, unlocked: true }, { campaignId: { $in: campaignsDm } },] } } })

            res.json({
                status: 200,
                message: "ok",
                payload: monsters
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

router.get('/bestiary/:id', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret.key);

        if (decoded) {
            const monster = await Monster.findById(req.params.id);

            res.json({
                status: 200,
                message: "ok",
                payload: monster
            })
        } else {
            res.json({
                status: 400,
                message: "No JWT"
            })
        }

    } catch (e) {
        res.json({
            status: 500,
            message: "Internal server error"
        })
    }
})

router.post('/bestiary', async (req, res) => {
    try {
        const monster = req.body;
        const newMonster = new Monster(monster);
        newMonster.save(function(err) {
            if (err) {
                return res.status(400).status({
                    message: "El monstruo ya existe."
                })
            }
        })
            .then(() => res.json({ status: 200, message: "Monstruo añadido" }))
            .catch(err => res.status(400).json('Error: ' + err))
    } catch (e) { 
        res.status(400).send('El monstruo no ha podido ser añadido.')
    }
})

router.put('/bestiary', async (req, res) => {
    try {
        const monster = req.body;
        // const newMonster = new Monster(monster);
        monster.save(function(err) {
            if (err) {
                res.status(400).send('El monstruo no ha podido ser añadido.')
            }
        })
            .then(() => res.json({ status: 200, message: "Monstruo añadido" }))
            .catch(err => res.status(400).json('Error: ' + err))
    } catch (e) { 
        res.status(400).send('El monstruo no ha podido ser añadido.')
    }
})


module.exports = router;

