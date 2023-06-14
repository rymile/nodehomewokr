const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  commentId: {
    type: Number,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Post", postsSchema);
