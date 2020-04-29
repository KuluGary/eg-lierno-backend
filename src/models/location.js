const mongoose = require('mongoose');
const { Schema } = mongoose;

const LocationSchema = new Schema({
      name: {
        type: String,
        required: true,
        unique: false,
        trim: false,
        minlength: 3
      },
      desription: {
        type: String,
        required: true,
        unique: false,
        trim: false,
        minlength: 3
      },
      coordinates: {
        type: Object,
        required: true,
      }
})

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;