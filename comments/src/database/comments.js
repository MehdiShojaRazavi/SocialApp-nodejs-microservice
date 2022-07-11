const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  id: {type: String, unique: true, required: true},
  hashtags: {type: [String], default: []},
  mentions: {type: [String], default: []},
  text: {type: String, required: true},
  timestamp: {type: Number},
  userId: {type: String, required: true}
});


const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;