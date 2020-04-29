const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = require('../configs/config');

let Monster = require('../models/monster');

router.get('/bestiary', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret.key);

        if (decoded) {
            const monsters = await Monster.find({});

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
        
    } catch(e) {
        res.json({
            status: 500,
            message: "Internal server error"
        })
    }
})


module.exports = router;

