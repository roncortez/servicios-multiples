const socioModel = require('../models/socioModel');

const socioController = {

    buscarSocio: async (req, res) => {
        const datos = req.params.datos
        try {
            const respuesta = await socioModel.buscarSocio(datos);
            res.json(respuesta);
        } catch (error) {
            console.log('Error en el controlador: ', error);
        }
    }

}

module.exports = socioController;