const express = require('express');
const router = express.Router();
const utils = require('../utils/utils');

router.post('/characters/like', async (req, res) => {
    try {
        const { valid, decoded, message } = utils.validateToken(req.headers.authorization);
        
        if (valid) {
            
        } else {
            res.status(401).json({ message })
        }
    } catch (error) {
        res.status(403).json({ message: "Error: " + error })
    }

})

module.exports = router;