const socioModel = require('../models/socioModel');
const path = require('path');
const { descargarFoto } = require('../config/ftp.js')
const os = require('os'); // Para obtener el directorio temporal del sistema    
const fs = require('fs');

const socioController = {
    buscarSocio: async (req, res) => {
        // Extraer el campo y dato del cuerpo de la solicitud
        const campo = Object.keys(req.body)[0]; // Obtiene el nombre del campo (cedula, num_tarjeta, etc.)
        const dato = req.body[campo]; // Obtiene el dato asociado a ese campo
        try {
            const respuesta = await socioModel.buscarSocio(campo, dato);

            if (!respuesta) {
                return res.status(404).json({ message: 'Datos no encontrados' });
            } else {

                const nombreFoto = respuesta.foto.split('\\').pop().trim();
                console.log('Nombre Foto: ', nombreFoto);
                if (nombreFoto === '') {
                    return res.status(200).json(respuesta);
                } else {
                    // Usamos la ruta absoluta para el destino de la descarga, incluyendo el nombre del archivo
                    //const rutaDestino = path.join(__dirname, '../fotos', nombreFoto);  // Concatenar el nombre del archivo al directorio de destino // Concatenar nombreFoto a la ruta destino                // Descargar el archivo al directorio local
                    const rutaDestino = path.join(os.tmpdir(), nombreFoto); 
                    console.log(rutaDestino);
                    try {
                        // Intentar descargar el archivo
                        await descargarFoto('Public/FOTOS_SOCIOS', nombreFoto, rutaDestino);

                        // Leer la imagen en base64 para enviar al frontend
                        const imageBuffer = await fs.promises.readFile(rutaDestino); // Usamos promesas para leer el archivo
                        const imageBase64 = imageBuffer.toString('base64');
                        // Agregar la imagen al objeto socio
                        respuesta.fotoBase64 = `data:image/jpeg;base64,${imageBase64}`;

                        await fs.promises.unlink(rutaDestino); // Usamos la rutaDestino en lugar de localPath
                    } catch (error) {
                        // Si no se encuentra la imagen, logueamos el error pero continuamos
                        if (error.code === 550) {
                            console.log(`El archivo ${nombreFoto} no se encuentra en el servidor FTP. Continuando sin imagen.`);
                        } 
                    }
                }


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
