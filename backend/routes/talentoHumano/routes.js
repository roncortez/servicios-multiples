const express = require('express');
const router = express.Router();
const controller = require('../../controllers/talentoHumano/controller');

// Empleados
router.get('/talento-humano/empleados', controller.getEmpleados)

// Permisos
router.post('/talento-humano/permiso', controller.createPermiso);
router.get('/talento-humano/permiso/:id', controller.obtenerPermisoPorId)
router.get('/talento-humano/ultimo-permiso', controller.obtenerUltimoPermiso);
router.get('/talento-humano/permisos', controller.obtenerPermisos);

// Reportes
router.post('/talento-humano/report', controller.getReport);


module.exports = router;