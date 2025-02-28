const controller = require('../../controllers/gestion/controller');
const express = require('express');
const router = express.Router();

router.get('/gestion/tipos-documento', controller.obtenerTiposDocumento); 
router.get('/gestion/destinatarios', controller.obtenerDestinatarios); 

module.exports = router;