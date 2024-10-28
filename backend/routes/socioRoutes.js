const express  = require('express');
const router = express.Router();
const socioController = require('../controllers/socioController');


router.get('/socio/:datos', socioController.buscarSocio);

module.exports = router;