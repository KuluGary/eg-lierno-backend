const mongoose = require('mongoose');
const { Schema } = mongoose;

const factionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true    
    },
    campaigns: {
        type: Array,
        required: false,
        unique: false
    },
    image: {
        type: String,
        required: false,
        unique: false
    },
    members: {
        type: Object,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: false,
        unique: false
    },
    ranks: {
        type: Array,
        required: false,
        unique: false
    }
  }, {
    timestamps: true,
  });

const Faction = mongoose.model('Faction', factionSchema);

module.exports = Faction;