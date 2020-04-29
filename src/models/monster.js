const mongoose = require('mongoose');
const { Schema } = mongoose;

const monsterSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    flavor: {
      type: Object,
      required: true,
      unique: false,
    },
    stats: {
      type: Object,
      required: false,
      unique: false      
    },
  }, {
    timestamps: true,
  });

const Monster = mongoose.model('Monster', monsterSchema, 'bestiary');

module.exports = Monster;