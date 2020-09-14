const express = require('express');

const productController = require('../controllers/product.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

//read data
router.get('/', authController.auth, productController.getAllProducts);

//create data
router.post('/new-product', productController.createProduct);

//read single data
router.get('/:id', productController.getSingleProduct);

//update data
router.patch('/update-product/:id', productController.updateProduct);
router.patch('/upload-img-product/:id', productController.uploadProductImage);

//delete data
router.delete('/delete-product/:id', productController.deleteProduct);

module.exports = router;
