const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = require('../configs/config');

let Location = require('../models/location');

router.get('/locations', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret.key);

        if (decoded) {        
            const locations = await Location.find({});            
            res.json({
                status: 200,
                message: "ok",
                payload: locations
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

router.get('/location/:id', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret.key);
        if (decoded) {
            const location = await Location.findById(req.params.id);

            res.json({
                status: 200,
                message: "ok",
                payload: location
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

router.get('/campaignmap/:id', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret.key);
        if (decoded) {
            const location = await Location.find({ "mapStats.hierarchy.parent": req.params.id });

            res.json({
                status: 200,
                message: "ok",
                payload: location
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

