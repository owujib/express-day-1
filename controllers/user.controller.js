const formidable = require('formidable');
const fs = require('fs');
const Product = require('../models/ProductModel');
const User = require('../models/UserModel');

exports.uploadProfileImg = (req, res, next) => {
  const formData = new formidable.IncomingForm();
  formData.parse(req, async (err, fields, files) => {
    try {
      let oldImage = files.profileImg.path;
      let newImage =
        'uploads/profile-images/' +
        new Date().getTime() +
        '-' +
        files.profileImg.name;

      fs.rename(oldImage, newImage, (err) => {
        if (err) throw err;
        console.log('file uploaded successfully');
      });

      req.user.profile_img = newImage;
      req.user.updatedAt = new Date();

      await req.user.save();
      res.send(req.user);
    } catch (error) {
      next(error);
    }
  });
};

exports.postCart = async (req, res, next) => {
  try {
    //find product by id
    const prodId = req.params.id;
    let product = await Product.findById(prodId);

    //add product to cart
    let cart = await req.user.addToCart(product);
    console.log(cart);
    res.send(req.user);
  } catch (error) {
    next(error);
  }
};

exports.removeCart = async (req, res, next) => {
  //find product by id
  const prodId = req.params.id;
  let product = await Product.findById(prodId);

  //remove product from cart
  let cart = await req.user.removeFromCart(product);
  res.send(req.user);
};
