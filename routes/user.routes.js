const express = require('express');

const User = require('../models/UserModel');

const router = express.Router();

//signup
router.post('/signup', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

//login
router.post('/login', (req, res) => {
  res.status(200).json({ msg: 'logged in successfully' });
});

module.exports = router;
