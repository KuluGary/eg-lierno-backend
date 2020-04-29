const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = require('../configs/config');

let Npc = require('../models/npc');

router.get('/npc', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret.key);

        if (decoded) {
            const npcs = await Npc.find({});

            res.json({
                status: 200,
                message: "ok",
                payload: npcs
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
        
    } catch(e) {
        res.json({
            status: 500,
            message: "Internal server error"
        })
    }
})


module.exports = router;

