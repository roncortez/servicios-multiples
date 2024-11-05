const express  = require('express');
const router = express.Router();
const socioController = require('../controllers/socioController');
const path = require('path');
const fs = require('fs');


router.post('/socio/buscar', socioController.buscarSocio);

// Ruta para servir fotos de socios
// Ruta para servir fotos de socios
router.get('/socio/foto/:nombreFoto', (req, res) => {
    const nombreFoto = req.params.nombreFoto;
    const rutaDirectorio = '\\\\192.168.0.205\\Public\\FOTOS_SOCIOS'; // Ruta del directorio donde se almacenan las fotos
    const rutaFoto = path.join(rutaDirectorio, nombreFoto);

    fs.access(rutaFoto, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ message: 'Foto no encontrada' });
        }
        res.sendFile(rutaFoto);
    });
});

router.post('/socio/registro', socioController.registrarSocio);




module.exports = router;