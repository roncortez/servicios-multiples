const sql = require('mssql');
const { poolPromise } = require('../config/db');

const socioModel = {
    buscarSocio: async (datos) => {
        try {
            const pool = await poolPromise;
            const respuesta = await pool.request()
                .input('datos', sql.VarChar, datos)
                .query('SELECT * FROM socios WHERE num_tarjeta = @datos')
            return respuesta.recordset[0];

        } catch (error) {
            console.error('Error en el modelo al obtener el socio:', error);
            throw error;
        }
    }
    
}

module.exports = socioModel;

