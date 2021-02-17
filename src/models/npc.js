const mongoose = require('mongoose');
const { Schema } = mongoose;

const npcSchema = new Schema({
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
    createdBy: {
      type: String,
      required: true
    }
  }, {
    timestamps: true,
  });

const Npc = mongoose.model('Npc', npcSchema);

module.exports = Npc;