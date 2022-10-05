const mongoose = require("mongoose");
const { Schema } = mongoose;

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    type: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    image: {
      type: Object,
      required: false,
      unique: false,
    },
    rarity: {
      type: Object,
      required: false,
      unique: false,
      default: "common",
    },
    description: {
      type: String,
      required: false,
      unique: false,
    },
    properties: {
      type: Array,
      required: false,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
