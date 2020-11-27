const express = require('express');
const router = express.Router();
const utils = require('../utils/utils');

let Item = require('../models/item');

router.get('/items', async (req, res) => {
    try {
        const items = await Item.find({});

        res.status(200).json({ payload: items })

    } catch (error) {
        res.status(500).json({ message: "Error: " + error })
    }
})

router.post('/items', async (req, res) => {
    try {
            const itemsIds = req.body;
            const items = await Item.find({ _id: { $in: itemsIds } });

            res.status(200).json({ payload: items })
    } catch (error) {
        res.json({ message: "Error: " + error })
    }
})

router.post('/item', async (req, res) => {
    try {
        const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            const item = req.body;
            item["createdBy"] = decoded["userId"];
            const newItem = new Item(item);

            newItem.save(function (err) {
                if (err) { return res.status(500).json({ message: "Error: " + err }) }

                res.status(200).json({ payload: newItem._id })
            })
        } else {
            res.status(500).json({ message });
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

module.exports = router;

