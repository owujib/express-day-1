const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

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
  //embeded document
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
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

userSchema.methods.addToCart = function (product) {
  //CHECK IF PRODUCT EXISTS IN MY CART ITEM, IF IT DOES ADD 1
  const cartItemIndex = this.cart.items.findIndex((cart) => {
    return cart.productId.toString() === product._id.toString();
  });
  console.log(cartItemIndex, 'cart'); //RETURNS THE INDEX OF THE PRODUCT

  //ADD ADD ONE TO  QTY
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];
  console.log(updatedCartItems, 'QUANTITY');

  if (cartItemIndex >= 0) {
    newQuantity = this.cart.items[cartItemIndex].quantity + 1;
    console.log(newQuantity, 'new qty');
    updatedCartItems[cartItemIndex].quantity = newQuantity;
    console.log(updatedCartItems, 'updated cart item');
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  console.log(updatedCartItems, 'UPDATED CART ITEMS');
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
  //filter
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== productId._id.toString();
  });
  console.log(updatedCartItems, 'UPDATED CART ITEMS');
  this.cart.items = updatedCartItems;
  return this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;
