const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = require('../configs/config');

let Campaign = require('../models/campaign');

router.get('/campaigns', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret.key);

        if (decoded) {
            const campaigns = await Campaign.find({ $or: [{ players: { $all: [decoded.userId] } }, { dm: decoded.userId }]});

            res.json({
                status: 200,
                message: "ok",
                payload: campaigns
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
            message: "Internal server error: " + e
        })
    }
})

router.get('/campaigns/:id', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret.key);
        if (decoded) {
            const campaign = await Campaign.findById(req.params.id);

            res.json({
                status: 200,
                message: "ok",
                payload: campaign
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

router.post('/campaigns/:id', async (req, res) => {
    try {
        console.log(req.params.id, req.body)
        await Campaign.findByIdAndUpdate(req.params.id, req.body, function (err, npc) {
            if (err) {
                return res.status(500).send('La campaña no ha podido ser modificada')
            }
            console.log(npc)
            return res.json({ status: 200, message: "Campaña modificada" })
        })
    } catch (e) {
        res.status(400).send('La campaña no ha podido ser modificada.')
    }
})


module.exports = router;

