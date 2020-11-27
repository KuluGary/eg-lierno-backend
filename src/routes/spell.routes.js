const express = require('express');
const router = express.Router();
const utils = require('../utils/utils');

let Spell = require('../models/spell');

router.post('/spells', async (req, res) => {
    try {
        const { decoded } = utils.validateToken(req.headers.authorization);
        const type = req.query.type;

        let spells;

        if (type === "allSpells" && decoded.roles.includes("SUPER_ADMIN")) {
            spells = await Spell.find({});
        } else {
            const spellIds = req.body;

            spells = await Spell.find({ _id: { $in: spellIds } });
        }

        res.status(200).json({ payload: spells });
    } catch (e) {
    res.status(500).json({ message: "Error: " + e });
}
})


module.exports = router;

