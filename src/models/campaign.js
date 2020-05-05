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
      players: {
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
      }
})

const Campaign = mongoose.model('Campaign', CampaignSchema);

module.exports = Campaign;