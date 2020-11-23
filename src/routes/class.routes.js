const express = require('express');
const router = express.Router();
const utils = require('../utils/utils');

let Class = require('../models/class');

router.get('/classes', async (req, res) => {
    try {
        const { valid, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            const classes = await Class.find({});
            res.status(200).json({ payload: classes })
        } else {
            res.status(500).json({ message })
        }
    } catch (error) {
        res.status(500).json({ message: "Error: " + error })
    }
})


module.exports = router;

