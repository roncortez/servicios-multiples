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
    },

    obtenerPermisoPorId: async(req, res) => {
        try {
            const id = req.params.id;
            const result = await empleadoModel.obtenerPermisoPorId(id);
            return res.json(result);

        } catch (error) {
            console.error("Error en el controlador: ", error);
        }      
    },

    obtenerUltimoPermiso: async(req, res) => {
        const result = await empleadoModel.obtenerUltimoPermiso();
        return res.json(result);
    }
}

module.exports = empleadoController;