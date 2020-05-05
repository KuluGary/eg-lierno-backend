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


module.exports = router;

