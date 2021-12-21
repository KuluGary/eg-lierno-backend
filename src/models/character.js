const mongoose = require("mongoose");
const { Schema } = mongoose;

const CharacterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      trim: false,
      minglength: 3,
    },
    flavor: {
      type: Object,
      required: true,
    },
    stats: {
      type: Object,
      required: true,
    },
    config: {
      type: Object,
    },
    createdBy: {
      type: String,
      required: true,
      unique: false,
      trim: false,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  },
);

const Character = mongoose.model("Character", CharacterSchema);

module.exports = Character;
