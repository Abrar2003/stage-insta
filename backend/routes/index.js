// routes/index.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Story = require('../models/story');

// Route to fetch all users and their stories
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    const stories = await Story.find().populate('user', '-password');
    const usersWithStories = users.map(user => {
      const userStory = stories.find(story => story.user._id.equals(user._id));
      return userStory ? userStory.toObject() : null;
    });
    res.json(usersWithStories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Dummy route to create a new story for a user
router.post('/stories', async (req, res) => {
  const { userId, content, contentType } = req.body;
  
  if (!userId || !content || !contentType) {
    return res.status(400).json({ message: 'User ID, content, and content type are required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const story = new Story({
      content,
      contentType,
      user: userId,  // Ensure userId is assigned to the user field
    });

    await story.save();
    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ message: `Error creating story: ${error.message}` });
  }
});

module.exports = router;
