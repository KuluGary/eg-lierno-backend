const express = require('express');
const router = express.Router();
const utils = require('../utils/utils');

let Log = require('../models/logs');

router.get('/logs/:id', async (req, res) => {
    try {
        const { valid, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            const log = await Log.find({ "campaignId": req.params.id });
            res.status(200).json({ payload: log })
        } else {
            res.status(401).json({ message })
        }
    } catch (e) {
        res.status(400).json({ message: "Error: " + e })
    }
})

router.post('/logs', async (req, res) => {
    try {
        // const { valid, message } = utils.validateToken(req.headers.authorization);

        // if (valid) {
            const log = req.body;
            const options = { upsert: true, new: true, setDefaultsOnInsert: true }

            Log.findOneAndUpdate({ "discordData.channel.id": log.discordData.channel.id }, req.body, options, function (err) {
                if (err) { return res.status(403).json({ message: err }) }

                res.status(200).json({ message: "Log añadido correctamente" })
            })
        // } else {
            // res.status(401).json({ message });
        // }
    } catch (err) {
        res.status(400).json({ message: "Error: " + err })
    }
})

module.exports = router;

