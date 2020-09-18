const { request } = require('express');
const JOI = require('joi');
const AppError = require('./appError');

exports.signupValidation = (data) => {
  const schema = JOI.object({
    fullname: JOI.string()
      .max(20)
      .required()
      .error(new AppError('fullname can not be left empty', 400)),
    email: JOI.string().required().email(),
    password: JOI.string().required().min(8).max(20),
  });
  return schema.validate(data);
};

exports.loginValidation = (data) => {
  const schema = JOI.object({
    email: JOI.string().required().email(),
    password: JOI.string().required().min(8).max(20),
  });
  return schema.validate(data);
};
