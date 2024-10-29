const sql = require('mssql');
const { poolPromise } = require('../config/db');

const socioModel = {
    buscarSocio: async (datosConsulta) => {
        try {
            let respuesta;
            const pool = await poolPromise;
            
            if (datosConsulta.length <= 10) {
                respuesta = await pool.request()
                    .input('cedula', sql.VarChar, datosConsulta)
                    .query('SELECT * FROM socios WHERE cedula = @cedula')
                return respuesta.recordset[0];
            } else {
                respuesta = await pool.request()
                    .input('num_tarjeta', sql.VarChar, datosConsulta)
                    .query('SELECT * FROM socios WHERE num_tarjeta = @num_tarjeta')
                return respuesta.recordset[0];
            }
            
               
        } catch (error) {
            console.error('Error en el modelo al obtener el socio:', error);
            throw error;
        }
    },

    registrarSocio: async (datos) => {
        
        const { id_socio, invitados } = datos;

        try {  
            const pool = await poolPromise;
            const respuesta = await pool.request()
                .input('id_socio', sql.Int, id_socio)
                .input('invitados', sql.Int, invitados)
                .query(`INSERT INTO Registros (id_socio, fecha_hora, invitados) VALUES 
                    (@id_socio, GETDATE() , @invitados)`);
            return respuesta;
        } catch (error) {
            console.log('Error en el modelo al registrar socio:', error);
        }
    }
}

module.exports = socioModel;

