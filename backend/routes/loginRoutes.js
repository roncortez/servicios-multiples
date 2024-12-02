const loginController = require('../controllers/loginController');
const express = require('express');
const router = express.Router();


router.post('/login', loginController.getCredentials);
router.post('/register', loginController.registerUser);

module.exports = router;
