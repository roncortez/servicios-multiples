const reportModel = require('../../models/talentoHumano/reportModel');

const reportController = {
    getReport: async (req, res) => {
        const result = await reportModel.getReport(req.body);
        return res.json(result);
    }
}

module.exports = reportController;