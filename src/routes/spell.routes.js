const express = require("express");
const router = express.Router();
const utils = require("../utils/utils");

let Spell = require("../models/spell");

router.post("/spells", async (req, res) => {
    try {
        const { decoded } = utils.validateToken(req.headers.authorization);
        const type = req.query.type;

        let spells;

        if (type === "allSpells" && req.session.role == "SUPER_ADMIN") {
            spells = await Spell.find({});
        } else {
            const spellIds = req.body;

            spells = await Spell.find({ _id: { $in: spellIds } });
        }

        res.status(200).json({ payload: spells });
    } catch (e) {
        res.status(400).json({ message: "Error: " + e });
    }
});

router.get("/spells", async (req, res) => {
    try {
        const { valid, message } = utils.validateToken(req.headers.authorization);
        if (valid) {
            let spells;

            spells = await Spell.find({});

            res.status(200).json({ payload: spells });
        } else {
            res.status(401).json({ message });
        }
    } catch (e) {
        res.status(400).json({ message: "Error: " + e });
    }
});

router.post("/spell", async (req, res) => {
    try {
        if (req.session.userId) {
            const spell = req.body;
            spell["createdBy"] = req.session.userId;

            const newSpell = new Spell(spell);

            newSpell.save(function (err) {
                if (err) {
                    return res.status(403).json({ message: err });
                }

                res.status(200).json({ payload: newSpell._id });
            });
        } else {
            res.status(401).json({ message });
        }
    } catch (err) {
        res.status(400).json({ message: "Error: " + err });
    }
});

module.exports = router;
