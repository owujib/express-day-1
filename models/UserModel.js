const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  profile_img: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
});

userSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 12);
  } catch (error) {
    next(error);
  }
});

// userSchema.methods.comparePassword = async function (
//   inputPassword,
//   userPassword
// ) {
//   try {
//     await bcrypt.compare(inputPassword, userPassword);
//   } catch (error) {
//     console.log(error);
//   }
// };

const User = mongoose.model('User', userSchema);

module.exports = User;
