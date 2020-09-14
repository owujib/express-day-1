const formidable = require('formidable');
const fs = require('fs');

const Product = require('../models/ProductModel');

exports.getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    console.log(req.user);
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

exports.uploadProductImage = async (req, res, next) => {
  let formData = new formidable.IncomingForm();
  console.log(req.user);
  formData.parse(req, (err, fields, files) => {
    const oldPath = files.productImg.path;
    const newpath =
      'uploads/product-images/' +
      new Date().getTime() +
      '-' +
      files.productImg.name;

    fs.rename(oldPath, newpath, (err) => {
      if (err) next(err);
      console.log('...image upload successful to ' + newpath);
    });
  });

  res.send('ahuja');
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
