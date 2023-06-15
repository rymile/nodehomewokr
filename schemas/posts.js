const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  commentid: {
    type: Number,
    required: true,
  },
  userid: {
    type: Number,
  },
});

module.exports = mongoose.model("Post", postsSchema);
