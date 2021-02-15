const Spell = require("../../models/spell");

module.exports = {
    getAllSpells: () => Spell.find({ })
}