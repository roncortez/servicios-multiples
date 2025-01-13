const express = require('express');
const router = express.Router();
const reportController = require('../../controllers/talentoHumano/reportController');
const empleadoController = require('../../controllers/talentoHumano/empleadoController');

// Empleados
router.get('/talento-humano/empleados', empleadoController.getEmpleados)

// Reportes
router.post('/talento-humano/report', reportController.getReport);

module.exports = router;