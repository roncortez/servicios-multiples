const reportModel = require('../models/reportModel');

const reportController = {
    getReport: async (req, res) => {
        //const { startDate, endDate } = req.body;
            
        try {
            const result = await reportModel.getReport(req.body);

            // Enviar el resultado directamente en formato JSON
            return res.json(result);
        } catch (error) {
            console.error('Error al obtener el reporte:', error);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener el reporte',
                error: error.message
            });
        }
    }
};

module.exports = reportController;
