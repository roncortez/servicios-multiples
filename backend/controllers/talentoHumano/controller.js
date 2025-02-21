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

    actualizarPermiso: async (req, res) => {

        const id  = req.params.id;
        const { value } = req.body

        try {   
            const result = await model.actualizarPermiso(id, value);
            return res.json(result);
        } catch (error) {
            console.error("Error en el controlador: ", error);
            return res.status(500).json({ error: "Error interno del servidor"} )
        }

    },

    obtenerTiposPermiso: async (req, res) => {

        try {
            
            const resultado = await model.obtenerTiposPermiso();
            return res.json(resultado);

        } catch (error) {
            console.error("Error en el controlador: ", error);
            return res.status(500).json( {error: "Error interno del servidor" });

        }
    },

    obtenerTiempoPermiso: async (req, res) => {

        try {
            
            const resultado = await model.obtenerTiempoPermiso();
            return res.json(resultado);

        } catch (error) {
            console.error("Error en el controlador: ", error);
            return res.status(500).json( {error: "Error interno del servidor" });

        }
    },

    // REPORTES

    getReport: async (req, res) => {
        const result = await model.getReport(req.body);
        return res.json(result);
    }
}

module.exports = controller;