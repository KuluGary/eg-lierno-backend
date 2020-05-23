const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = require('../configs/config');

let Class = require('../models/class');

router.get('/classes', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret.key);

        if (decoded) {        
            const classes = await Class.find({});            
            res.json({
                status: 200,
                message: "ok",
                payload: classes
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

