const mongoose = require('mongoose');
const { Schema } = mongoose;

const LogSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  campaignId: {
    type: String,
    required: true
  },
  discordData: {
    type: Object,
    required: false,
  },
  data: {
    type: Object,
    required: false
  },
  messages: {
    type: Array,
    required: true,
  },
  messageCount: {
    type: Number,
    required: false
  }
}, {
  timestamps: true
})

const Log = mongoose.model('Log', LogSchema);

module.exports = Log;