const express = require('express');

const Product = require('../models/ProductModel');

const router = express.Router();

//read data
router.get('/', (req, res) => {
  res.status(200).json({ msg: 'products' });
});

//create data
router.post('/new-product', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
});

//read single data
router.get('/:id', (req, res) => {
  res.status(200).json({ msg: 'product' });
});

//update data
router.patch('/update-product/:id', (req, res) => {
  res.status(200).json({ msg: 'product updated' });
});

//delete data
router.delete('/delete-product/:id', (req, res) => {
  res.status(200).json({ msg: 'product deleted' });
});

module.exports = router;
