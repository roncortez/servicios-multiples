const express = require('express');
const router = express.Router();
const factController  = require('../controllers/factController')

router.get('/facturacion/articulos', factController.getArticulos)

module.exports = router;