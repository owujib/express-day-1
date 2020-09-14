const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    trim: true,
  },
  size: {
    type: String,
    required: [true, 'a product must have a size'],
  },
  color: [String],
  productImg: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
