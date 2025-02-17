const express = require('express');
const router = express.Router();
const reportController = require('../../controllers/talentoHumano/reportController');
const empleadoController = require('../../controllers/talentoHumano/empleadoController');

// Empleados
router.get('/talento-humano/empleados', empleadoController.getEmpleados)

// Reportes
router.post('/talento-humano/report', reportController.getReport);


// Permisos
router.post('/talento-humano/permiso', empleadoController.createPermiso);
router.get('/talento-humano/permiso/:id', empleadoController.obtenerPermisoPorId)
router.get('/talento-humano/ultimo-permiso', empleadoController.obtenerUltimoPermiso);


module.exports = router;