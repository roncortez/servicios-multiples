const empleadoModel = require('../../models/talentoHumano/empleadoModel');

const empleadoController = {
    getEmpleados: async (req, res) => {
        const result = await empleadoModel.getEmpleados();
        return res.json(result);
    },

    createPermiso: async(req, res) => {
        const data = req.body;
        const result = await empleadoModel.createPermiso(data);
        return res.json(result);
    }
}

module.exports = empleadoController;