const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    }
  }, {
    timestamps: true,
  });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;