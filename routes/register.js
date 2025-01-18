const express = require('express');
const router = express.Router();
const authController = require('../controllers/registerController');


router.route('/register').post(authController.register);


module.exports = router;