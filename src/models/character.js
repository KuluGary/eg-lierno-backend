const mongoose = require('mongoose');
const { Schema } = mongoose;

const CharacterSchema = new Schema({
  player: {
    type: String,
    required: true,
    unique: false,
    trim: false,
    minlength: 3
  },
  flavor: {
    type: Object,
    required: true,
  },
  stats: {
    type: Object,
    required: true
  },
  config: {
    type: Object
  }
}, {
  timestamps: true,
})

const Character = mongoose.model('Character', CharacterSchema);

module.exports = Character;