const express = require('express');

const productController = require('../controllers/product.controller');

const router = express.Router();

//read data
router.get('/', productController.getAllProducts);

//create data
router.post('/new-product', productController.createProduct);

//read single data
router.get('/:id', productController.getSingleProduct);

//update data
router.patch('/update-product/:id', productController.updateProduct);

//delete data
router.delete('/delete-product/:id', productController.deleteProduct);

module.exports = router;
