// models/story.js
const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    enum: ['image', 'video'],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
