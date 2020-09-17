const express = require('express');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

const router = express.Router();

//signup
router.post('/signup', authController.signup);

//login
router.post('/login', authController.login);

router.use(authController.isAuth); //authorization middleware

//update profile
router.patch('/update-profile', userController.uploadProfileImg);
router.post('/add-to-cart/:id', userController.postCart);
router.post('/remove-cart/:id', userController.removeCart);

module.exports = router;
