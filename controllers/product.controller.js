const Product = require('../models/ProductModel');

exports.getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById({ _id: id });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    let id = req.params.id;
    const product = await Product.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    const product = await Product.findByIdAndDelete({ _id: id });
    res.send('product deleted');
  } catch (error) {
    console.log(error);
  }
};
