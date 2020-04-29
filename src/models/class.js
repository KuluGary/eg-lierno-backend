const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClassSchema = new Schema({
      name: {
        type: String,
        required: true,
        unique: false,
        trim: false,
        minlength: 3
      }
})

const Class = mongoose.model('Class', ClassSchema);

module.exports = Class;