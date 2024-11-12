// ftp.js
// Conexión a servidor ftp

const ftp = require('basic-ftp');
const client = new ftp.Client();
const path = require('path');

const fs = require('fs')
// client.ftp.verbose = true; //Activa mensajes de log

async function connectFTP() {

    try {
        await client.access({
            host: '192.168.0.205',
            user: 'PUBLICO',
            password: 'QNAP1234',
            secure: false
        });

        console.log('Conexión exitosa al servidor de archivos');

    } catch (error) {
        console.error('Error al conectarse');
    }

}



// Función para descargar un archivo
async function descargarFoto(directorio, nombreArchivo, rutaDestino) {
    await connectFTP();  // Asegurarse de que la conexión esté establecida
    try {
        await client.cd(directorio);
        console.log(`Cambiado al directorio: ${directorio}`);

        // Descargar el archivo al directorio local
        //await client.downloadTo(rutaDestino, nombreArchivo);
        // Descargar el archivo en un buffer directamente
        // Descargar el archivo directamente a la ruta de destino
        const stream = await client.downloadTo(rutaDestino, nombreArchivo);

        // Leer el archivo descargado y convertirlo en buffer
        const buffer = await fs.promises.readFile(rutaDestino);
        console.log(`Archivo ${nombreArchivo} convertido a buffer`);

        // Eliminar el archivo temporal
        await fs.promises.unlink(rutaDestino);

        return buffer;

        console.log(`Archivo ${nombreArchivo} descargado exitosamente a memoria`);

    } catch (error) {
        // Verificar si el error es el tipo que indica que el archivo no existe
        if (error.code === 550) {
            console.log(`El archivo ${nombreArchivo} no se encuentra en el servidor FTP. Continuando sin descargar.`);
        } else {
            console.error('Error al descargar el archivo:', error);
        }
    }
}

module.exports = {
    descargarFoto,
    client
}
