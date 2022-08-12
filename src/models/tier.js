const mongoose = require("mongoose");
const { Schema } = mongoose;

const TierSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      trim: false,
      minlength: 3,
    },
    type: {
      type: String,
      required: true,
      unique: false,
      trim: false,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const Tier = mongoose.model("Tier", TierSchema);

module.exports = Tier;
