const express = require('express');
const router = express.Router();
const utils = require('../utils/utils');

let Location = require('../models/location');

router.get('/locations', async (req, res) => {
    try {
        const { valid, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            const locations = await Location.find({});
            res.status(200).json({ payload: locations })
        } else {
            res.status(500).json({ message })
        }
    } catch (e) {
        res.status(500).json({ message: "Error: " + e })
    }
})

router.get('/location/:id', async (req, res) => {
    try {
        const { valid, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            const location = await Location.findById(req.params.id);

            res.status(200).json({ payload: location })
        } else {
            res.status(500).json({ message })
        }

    } catch (e) {
        res.status(500).json({ message: "Error: " + e })
    }
})

router.get('/campaignmap/:id', async (req, res) => {
    try {
        const { valid, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            const location = await Location.find({ "mapStats.hierarchy.parent": req.params.id });

            res.status(200).json({ payload: location })
        } else {
            res.status(500).json({ message })
        }

    } catch (e) {
        res.status(500).json({ message: "Error: " + e })
    }
})

module.exports = router;

