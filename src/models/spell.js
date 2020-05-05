const mongoose = require('mongoose');
const { Schema } = mongoose;

const spellSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    stats: {
      type: Object,
      required: true,
      unique: false
    }
  }, {
    timestamps: true,
  });

const Spell = mongoose.model('Spell', spellSchema);

module.exports = Spell;