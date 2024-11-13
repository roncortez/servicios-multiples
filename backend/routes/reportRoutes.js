const reportController = require('../controllers/reportController');
const express = require('express');
const router = express.Router();

router.post('/reporte', reportController.getReport);

module.exports = router;