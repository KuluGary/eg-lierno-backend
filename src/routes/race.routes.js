const express = require('express');
const router = express.Router();
const utils = require('../utils/utils');

let Race = require('../models/race');

router.get('/races', async (req, res) => {
    try {
        const races = await Race.find({});

        res.status(200).json({ payload: races });
    } catch (e) {
        res.status(500).json({ message: "Error: " + e })
    }
})

router.get('/race/:id', async (req, res) => {
    try {
        const race = await Race.findById(req.params.id);

        res.status(200).json({ payload: race });

    } catch (e) {
        res.status(500).json({ message: "Error: " + e })
    }
})


module.exports = router;

