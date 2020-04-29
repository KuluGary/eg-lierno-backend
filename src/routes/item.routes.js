const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = require('../configs/config');
const bcrypt = require('bcrypt');

let Item = require('../models/item');

router.post('/items', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret.key);

        if (decoded) {
            const itemsIds = req.body;

            const items = await Item.find({_id: {$in: itemsIds}});            
            res.json({
                status: 200,
                message: "ok",
                payload: items
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

