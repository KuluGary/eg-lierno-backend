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
  name: {
    type: String,
    required: true,
    unique: false,
    trim: false,
    minlength: 1
  }
}, {
  timestamps: true,
})

const Character = mongoose.model('Character', CharacterSchema);

module.exports = Character;