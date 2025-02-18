const model = require('../../models/talentoHumano/model');

const controller = {

    //EMPLEADOS
    getEmpleados: async (req, res) => {
        const result = await model.getEmpleados();
        return res.json(result);
    },

    // PERMISOS
    createPermiso: async(req, res) => {
        const data = req.body;
        const result = await model.createPermiso(data);
        return res.json(result);
    },

    obtenerPermisoPorId: async(req, res) => {
        try {
            const id = req.params.id;
            const result = await model.obtenerPermisoPorId(id);
            return res.json(result);

        } catch (error) {
            console.error("Error en el controlador: ", error);
        }      
    },

    obtenerUltimoPermiso: async(req, res) => {
        const result = await model.obtenerUltimoPermiso();
        return res.json(result);
    },

    obtenerPermisos: async(req, res) => {
        try {
            const result = await model.obtenerPermisos();
            return res.json(result);
        } catch (error) {
            console.error("Error en el controlador: ", error);
        }
    }, 

    getReport: async (req, res) => {
        const result = await model.getReport(req.body);
        return res.json(result);
    }
}

module.exports = controller;