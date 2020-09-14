const express = require('express');

const productController = require('../controllers/product.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

//read data
router.get('/', productController.getAllProducts);

// router.use(authController.isAuth);

//create data
router.post('/new-product', productController.createProduct);

//read single data
router.get('/:id', productController.getSingleProduct);

//update data
router.patch('/update-product/:id', productController.updateProduct);

router.patch(
  '/upload-img/:id',
  authController.isAuth,
  productController.uploadProductImg
);

//delete data
router.delete('/delete-product/:id', productController.deleteProduct);

module.exports = router;
