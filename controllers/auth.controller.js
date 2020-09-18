const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/UserModel');
const AppError = require('../utils/appError');
const utils = require('../utils/validation');

exports.signup = async (req, res, next) => {
  try {
    const { error } = utils.signupValidation(req.body);

    if (error) {
      return next(new AppError(error, 400));
    }
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return next(
        new AppError('a user with this credentials already exist', 400)
      );
    }
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { error } = utils.loginValidation(req.body);
    if (error) {
      next(new AppError(error, 400));
    }

    const { email, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      next(new AppError('User does not exist', 400));
    }

    const correctPassword = await bcrypt.compare(password, userExist.password);
    if (!correctPassword) {
      next(new AppError('incorrect credentials', 400));
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
