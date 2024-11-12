const reportModel = require('../models/reportModel');



const reportController = {

    getReport: async (req, res) => {
        const { startDate, endDate } = req.body;

        const result = await reportModel.getReport(startDate, endDate);
        return res.send(result);
    }


} 

module.exports = reportController;