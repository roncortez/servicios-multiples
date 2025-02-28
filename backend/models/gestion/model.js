const poolCirmil = require('../../config/db');

const model = {
    
    obtenerTiposDocumento : async () => {
        try {
            const pool = await poolCirmil.poolPromise;
            const result = await pool.request().query('SELECT * FROM TiposDocumento');
            return result.recordset;
        } catch (error) {
            console.log(error);
        }
    },

    obtenerDestinatarios : async () => {
        try {  
            const pool = await poolCirmil.poolPromise;
            const respuesta = await pool.request().query('SELECT * FROM Destinatarios');
            return respuesta.recordset
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = model;

