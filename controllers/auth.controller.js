const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      next(new Error('User does not exist'));
    }

    const correctPassword = await bcrypt.compare(password, userExist.password);
    if (!correctPassword) {
      next(new Error('incorrect credentials'));
    }

    let token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET);
    res.status(200).header('auth_token', token).json({ userId: userExist._id });
  } catch (error) {
    console.log(error);
  }
};

//authorization
exports.isAuth = async (req, res, next) => {
  try {
    let token = req.header('auth_token');

    if (!token) {
      res.status(403).json({ msg: 'user is not authorised please login' });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById({ _id: verified.id });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
