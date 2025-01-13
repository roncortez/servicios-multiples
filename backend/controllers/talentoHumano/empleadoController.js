const empleadoModel = require('../../models/talentoHumano/empleadoModel');

const empleadoController = {
    getEmpleados: async (req, res) => {
        const result = await empleadoModel.getEmpleados();
        return res.json(result);
    }
}

module.exports = empleadoController;