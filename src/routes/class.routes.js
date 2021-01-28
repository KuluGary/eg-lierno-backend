const express = require('express');
const router = express.Router();

let Class = require('../models/class');

router.get('/classes', async (req, res) => {
    try {
        const classes = await Class.find({});
        res.status(200).json({ payload: classes })
        
    } catch (error) {
        res.status(400).json({ message: "Error: " + error })
    }
})


module.exports = router;

