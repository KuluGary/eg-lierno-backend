const mongoose = require('mongoose');
const { Schema } = mongoose;

const CampaignSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    trim: false,
    minlength: 3
  },
  game: {
    type: String,
    required: true,
    unique: false,
    trim: false,
    minlength: 3
  },
  mode: {
    type: String,
    required: false,
    unique: false,
    trim: false,
    minlength: 3
  },
  rules: {
    type: Array,
    required: false,
    unique: false
  },
  players: {
    type: Array,
    required: false,
    unique: false
  },
  characters: {
    type: Array,
    required: false,
    unique: false
  },
  dm: {
    type: String,
    required: true,
    unique: false
  },
  completed: {
    type: Boolean,
    required: true,
    unique: false
  },
  diary: {
    type: Array,
    required: false,
    unique: false
  },
}, {
  timestamps: true,
})

const Campaign = mongoose.model('Campaign', CampaignSchema);

module.exports = Campaign;