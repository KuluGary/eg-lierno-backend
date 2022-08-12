const Spell = require("../models/spell");
const utils = require("../utils/utils");

/**
 * @deprecated
 */
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
      const spellIds = JSON.parse(req.params.id);

      if (Array.isArray(spellIds)) {
        const spells = await Spell.find({ _id: { $in: spellIds } });

        res.status(200).json({ payload: spells });
      } else {
        const spell = await Spell.findById(spellIds);

        res.status(200).json({ payload: spell });
      }
    } else {
      const { valid, decoded, message } = utils.validateToken(req.headers.authorization);
      if (valid) {
        let spells;

        spells = await Spell.find({ $or: [{ public: true }, { public: false, createdBy: decoded.userId }] });

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
