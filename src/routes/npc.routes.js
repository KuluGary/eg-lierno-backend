const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = require('../configs/config');

let Npc = require('../models/npc');
let User = require('../models/user');
let Campaign = require('../models/campaign');

router.get('/npc', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret.key);

        if (decoded) {
            let campaigns = await User.distinct("campaigns", { _id: decoded.userId })
            let campaignsDm = (await Campaign.distinct("_id", { dm: decoded.userId }))
                .map(campaign => campaign.toString());
            let npcs = await Npc.find({ "flavor.campaign": { $elemMatch: { $or: [{ campaignId: { $in: campaigns }, unlocked: true }, { campaignId: { $in: campaignsDm } },] } } })

            res.json({
                status: 200,
                message: "ok",
                payload: Array.from(new Set(npcs.map(a => a.id))).map(id => npcs.find(a => a.id === id))
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

router.get('/npc/:id', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret.key);
        if (decoded) {
            const npc = await Npc.findById(req.params.id);

            res.json({
                status: 200,
                message: "ok",
                payload: npc
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


module.exports = router;

