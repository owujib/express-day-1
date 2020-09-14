const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');
const authController = require('../controllers/auth.controller');

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
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) res.status(400).status({ msg: 'err no user' });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('invalid passowrd');

    const token = jwt.sign({ _id: user._id }, 'secret');
    res.header('auth_token', token).send(token);
    res.status(200).json({ msg: 'logged in successfully' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
