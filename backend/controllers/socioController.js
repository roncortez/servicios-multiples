const socioModel = require('../models/socioModel');

const socioController = {

    buscarSocio: async (req, res) => {
        const datos = req.params.datos
        try {
            const respuesta = await socioModel.buscarSocio(datos);

            if (!respuesta) {
                return res.status(404).json({ message: 'Datos no encontrados'});
            }
            return res.status(200).json(respuesta);
        } catch (error) {
            console.log('Error en el controlador: ', error);
        }
    },

    registrarSocio: async (req, res) => {
        try {
            await socioModel.registrarSocio(req.body);
            return res.status(201).send('Registro exitoso');
        } catch (error) {
            console.error('Error en controlador al insertar registro:', error);
            return res.status(500).json({ message: 'Error al registrar socio' })
        }
    }
}

module.exports = socioController;