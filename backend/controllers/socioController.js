const socioModel = require('../models/socioModel');
const path = require('path');
const fs = require('fs');

const socioController = {
    buscarSocio: async (req, res) => {
        const datos = req.params.datos;
        try {
            const respuesta = await socioModel.buscarSocio(datos);

            if (!respuesta) {
                return res.status(404).json({ message: 'Datos no encontrados' });
            }

            if (respuesta.foto) {
                const nombreFoto = respuesta.foto.split('\\').pop().trim();
                const rutaDirectorio = '\\\\192.168.0.205\\Public\\FOTOS_SOCIOS'; // Ruta del directorio
                const rutaFoto = path.join(rutaDirectorio, nombreFoto);
                
                console.log('Ruta de foto a verificar:', rutaFoto); // Para depuración

                try {
                    await fs.promises.access(rutaFoto, fs.constants.F_OK);
                    respuesta.foto = `${req.protocol}://${req.get('host')}/api/socio/foto/${encodeURIComponent(nombreFoto)}`;
                } catch (err) {
                    console.error('Foto no encontrada:', rutaFoto);
                    respuesta.foto = '/path/to/default/image.png'; // Cambia esto por tu imagen predeterminada
                }
            } else {
                respuesta.foto = '/path/to/default/image.png'; // Cambia esto por tu imagen predeterminada
            }

            return res.status(200).json(respuesta);
        } catch (error) {
            console.log('Error en el controlador: ', error);
            return res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    registrarSocio: async (req, res) => {
        try {
            await socioModel.registrarSocio(req.body);
            return res.status(201).send('Registro exitoso');
        } catch (error) {
            console.error('Error en controlador al insertar registro:', error);
            return res.status(500).json({ message: 'Error al registrar socio' });
        }
    }
}

module.exports = socioController;
