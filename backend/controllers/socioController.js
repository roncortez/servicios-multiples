const socioModel = require('../models/socioModel');

const socioController = {

    buscarSocio: async (req, res) => {
        const datos = req.params.datos
        try {
            const respuesta = await socioModel.buscarSocio(datos);

            if (!respuesta || respuesta.lentgh == 0) {
                return res.status(404).json({ message: 'Datos no encontrados'});
            }

            return res.status(200).json(respuesta);
        } catch (error) {
            console.log('Error en el controlador: ', error);
        }
    }

}

module.exports = socioController;