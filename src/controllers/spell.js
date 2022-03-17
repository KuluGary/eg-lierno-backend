const Spell = require("../models/spell");
const utils = require("../utils/utils");

module.exports.postSpells = async (req, res) => {
  try {
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
};

module.exports.getSpells = async (req, res) => {
  try {
    if (req.params.id) {
      const spell = await Spell.findById(req.params.id);

      res.status(200).json({ payload: spell });
    } else {
      const { valid, message } = utils.validateToken(req.headers.authorization);
      if (valid) {
        let spells;

        spells = await Spell.find({});

        res.status(200).json({ payload: spells });
      } else {
        res.status(401).json({ message });
      }
    }
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
};

module.exports.postSpell = async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const spell = req.body;
      spell["createdBy"] = decoded["userId"];
      const newSpell = new Spell(spell);

      newSpell.save(function (err) {
        if (err) {
          return res.status(403).json({ message: "Error: " + err });
        }

        res.status(200).json({ payload: newSpell._id });
      });
    } else {
      res.status(401).json({ message });
    }
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
};
