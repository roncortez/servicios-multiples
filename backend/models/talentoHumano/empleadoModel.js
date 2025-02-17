const { poolPromise: poolLat } = require('../../config/dbLat');
const { poolPromise: poolCirmil } = require('../../config/db');

const sql = require('mssql');

const empleadoModel = {

    getEmpleados: async () => {
        const query = "SELECT * FROM Empleados ORDER BY Nombre"
        const pool = await poolCirmil;
        const result = await pool.request().query(query);

        return result.recordset;
    },


    // Permisos

    createPermiso: async (data) => {
        const {id_empleado, id_tipo_permiso, dia_permiso, hora_salida, hora_ingreso, total_horas, fecha_salida, fecha_ingreso,
            total_dias} = data
        try {

                // Imprimir los valores antes de la conversión
            console.log("Valores recibidos:");
            console.log("hora_salida:", hora_salida);
            console.log("hora_ingreso:", hora_ingreso);

            const query = `
                INSERT INTO Permisos 
                    (   
                        id_empleado, 
                        id_tipo_permiso, 
                        dia_permiso, 
                        hora_salida, 
                        hora_ingreso, 
                        total_horas, 
                        fecha_salida, 
                        fecha_ingreso,
                        total_dias,
                        fecha_creacion
                    )
                OUTPUT INSERTED.*
                VALUES (
                        @id_empleado, 
                        @id_tipo_permiso, 
                        @dia_permiso, 
                        @hora_salida, 
                        @hora_ingreso, 
                        @total_horas, 
                        @fecha_salida, 
                        @fecha_ingreso,
                        @total_dias,
                        GETDATE());
            `;

            const pool = await poolCirmil;
            const request = pool.request();

       
            // Solo pasamos el idEmpleado como parámetro
            request.input('id_empleado', sql.Int, id_empleado);
            request.input('id_tipo_permiso', sql.Int, id_tipo_permiso);
            request.input('dia_permiso', sql.DateTime, dia_permiso);
            request.input('hora_salida', sql.VarChar, hora_salida);
            request.input('hora_ingreso', sql.VarChar, hora_ingreso);         
            request.input('total_horas', sql.Float, total_horas);
            request.input('fecha_salida', sql.VarChar, fecha_salida);
            request.input('fecha_ingreso', sql.VarChar, fecha_ingreso);
            request.input('total_dias', sql.Decimal(18,0), total_dias);


            const result = await request.query(query);

            return result.recordset[0];

        } catch (error) {
            console.error("Error al registrar permiso:", error);
            throw error;
        }
    },

    obtenerPermisoPorId : async(id) => {
        try {
            const query = `
                SELECT 
                P.id,
                E.nombre AS empleado,
                TP.nombre AS tipo,
                P.hora_salida,
                P.hora_ingreso,
                P.total_horas,
                P.fecha_salida,
                P.fecha_ingreso,
                P.total_dias
                FROM Permisos AS P
                INNER JOIN Empleados AS E 
                ON P.id_empleado = E.id
                INNER JOIN TipoPermiso AS TP
                ON P.id_tipo_permiso = TP.id
                WHERE P.id = @idPermiso`
            const pool = await poolCirmil;
            const result = await pool.request()
                .input("idPermiso", sql.Int, id)
                .query(query);

            return result.recordset[0];
        } catch (error) {
            console.error("Error en el modelo: ", error)
        }    
    },

    obtenerUltimoPermiso: async() => {
        try {
            const query = 
            `SELECT TOP 1 id
            FROM Permisos ORDER BY id DESC`
        
            const pool = await poolCirmil;
            const result = await pool.request().query(query);

            return result.recordset[0].id + 1 ;


        } catch (error) {
            console.error("Error en el modelo", error);
        }
    }
}

module.exports = empleadoModel;