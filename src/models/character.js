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
      character: {
          type: Array,
          required: true,
          unique: false
      }
})

const Character = mongoose.model('Character', CharacterSchema);

module.exports = Character;