const loginController = require('../controllers/loginController');
const express = require('express');
const router = express.Router();

// Usuarios
router.post('/usuarios', loginController.createUsuarios);
router.put('/usuarios/:id', loginController.updateUsuario);
router.get('/usuarios', loginController.getUsuarios);
router.post('/login', loginController.getCredentials);
router.post('/register', loginController.registerUser);

module.exports = router;
