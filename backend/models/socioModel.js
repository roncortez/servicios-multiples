const sql = require('mssql');
const { poolPromise } = require('../config/db');

const socioModel = {
    buscarSocio: async (campo, datoConsulta) => {
        try {
            let respuesta;
            const pool = await poolPromise;

            // Revisa qué campo está siendo utilizado para la búsqueda.
            if (campo === 'cedula') {
                // Buscar por cédula
                respuesta = await pool.request()
                    .input('cedula', sql.VarChar, datoConsulta)
                    .query(`
                        SELECT 'Socio' AS tipo, id_socio, NULL AS iddep, cedula, nombres, fuerza, grado, edad, foto, id_fuerza, deuda_apo   
                        FROM socios
                        WHERE cedula = @cedula
                        UNION ALL
                        SELECT 'Dependiente' AS tipo, NULL AS id_socio, iddep, cedula, nombres, NULL AS fuerza ,NULL AS grado , edad, NULL AS foto, NULL AS id_fuerza, NULL AS deuda_apo
                        FROM dependientes
                        WHERE cedula = @cedula          
                    `);
                return respuesta.recordset[0];

            } else if (campo === 'num_tarjeta') {
                // Buscar por número de tarjeta
                respuesta = await pool.request()
                    .input('num_tarjeta', sql.VarChar, datoConsulta)
                    .query(`
                        SELECT 'Socio' AS tipo, id_socio, NULL AS iddep, cedula, nombres, fuerza, grado, edad, foto, id_fuerza, deuda_apo   
                        FROM socios
                        WHERE num_tarjeta = @num_tarjeta  
                        UNION ALL
                        SELECT 'Dependiente' AS tipo, NULL AS id_socio, iddep, cedula, nombres, NULL AS fuerza ,NULL AS grado , edad, NULL AS foto, NULL AS id_fuerza, NULL AS deuda_apo
                        FROM dependientes
                        WHERE n_tarjeta = @num_tarjeta   
                    `);
                return respuesta.recordset[0];

            } else if (campo === 'faf') {
                // Buscar por FAF
                respuesta = await pool.request()
                    .input('num_poliza', sql.VarChar, `%${datoConsulta}`)
                    .query('SELECT * FROM socios WHERE num_poliza LIKE @num_poliza');
                return respuesta.recordset[0];

            } else if (campo === 'nombres') {
                // Buscar por nombres (utilizando LIKE para permitir coincidencias parciales)
                respuesta = await pool.request()
                    .input('nombres', sql.VarChar, `%${datoConsulta}%`) // Agregar '%' para buscar coincidencias parciales
                    .query(`
                        SELECT 'Socio' AS tipo, id_socio, NULL AS iddep, cedula, nombres, fuerza, grado, edad, foto, id_fuerza, deuda_apo   
                        FROM socios
                        WHERE nombres LIKE @nombres
                        UNION ALL
                        SELECT 'Dependiente' AS tipo, NULL AS id_socio, iddep, cedula, nombres, NULL AS fuerza ,NULL AS grado , edad, NULL AS foto, NULL AS id_fuerza, NULL AS deuda_apo
                        FROM dependientes
                        WHERE nombres LIKE @nombres
                   `);
                return respuesta.recordset[0];
            }

            // Si no se encontró el socio con los datos proporcionados
            return null;

        } catch (error) {
            console.error('Error en el modelo al obtener el socio:', error);
            throw error;
        }
    },

    registrarSocio: async (datos) => {
        const { id_usuario, invitados, deuda_aportes } = datos;

        try {
            const pool = await poolPromise;
            const respuesta = await pool.request()
                .input('id_usuario', sql.Int, id_usuario)
                .input('invitados', sql.Int, invitados)
                .input('deuda_aportes', sql.Numeric(11, 2), deuda_aportes)
                .query(`INSERT INTO Registros (id_socio, fecha_hora, invitados, deuda_aportes) VALUES 
                    (@id_usuario, GETDATE() , @invitados, @deuda_aportes)`);
            return respuesta;
        } catch (error) {
            console.log('Error en el modelo al registrar socio:', error);
        }
    }
}

module.exports = socioModel;
