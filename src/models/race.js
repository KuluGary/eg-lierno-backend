const mongoose = require('mongoose');
const { Schema } = mongoose;

const RaceSchema = new Schema({
      name: {
        type: String,
        required: true,
        unique: false,
        trim: false,
        minlength: 3
      },
      subraces: {
          type: Array,
          required: false,
          unique: false
      }
})

const Race = mongoose.model('Race', RaceSchema);

module.exports = Race;