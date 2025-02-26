const { poolPromise: poolCirmil } = require('../../config/db');
const { poolPromise: poolLince } = require('../../config/dbLince');
const sql = require('mssql');
const dayjs = require('dayjs');

const model = {

    // EMPLEADOS

    getEmpleados: async () => {

        const query = "SELECT * FROM Empleados ORDER BY Nombre"
        const pool = await poolCirmil;
        const result = await pool.request().query(query);

        return result.recordset;
    },

    crearEmpleado: async (datos) => {

        const {cedula, nombres, apellido, direccion, telefono, celular} = datos

        try {
            const query = 
                `INSERT INTO Empleados (cedula, nombres, apellido, direccion, telefono, celular)
                VALUES (@cedula, @nombres, @apellido, @direccion, @telefono, @celular)`
            const pool = await poolCirmil;
            await pool.request()
                .input("cedula", sql.VarChar, cedula)
                .input("nombres", sql.VarChar, nombres)
                .input("apellido", sql.VarChar, apellido)
                .input("telefono", sql.VarChar, telefono)
                .input("celular", sql.VarChar, celular)
                .input("direccion", sql.VarChar, direccion)
                .query(query);
            return { mensaje: "Creación de empleado exitosa" };    
        } catch (error) {
            console.error("Error al crear empleado");
        }
       
    },

    // PERMISOS 

    createPermiso: async (data) => {

        const { id_empleado, id_tipo_permiso, id_tiempo_permiso, dia_permiso, hora_salida, hora_ingreso, total_horas, fecha_salida, fecha_ingreso,
            total_dias } = data
        try {

            const query = `
                INSERT INTO Permisos 
                    (   
                        id_empleado, 
                        id_tipo_permiso, 
                        id_tiempo_permiso,
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
                        @id_tiempo_permiso,
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
            request.input('id_tiempo_permiso', sql.Int, id_tiempo_permiso);
            request.input('dia_permiso', sql.DateTime, dia_permiso ? new Date(dia_permiso) : null);
            request.input('hora_salida', sql.VarChar, hora_salida);
            request.input('hora_ingreso', sql.VarChar, hora_ingreso);
            request.input('total_horas', sql.Float, total_horas);
            request.input('fecha_salida', sql.VarChar, fecha_salida);
            request.input('fecha_ingreso', sql.VarChar, fecha_ingreso);
            request.input('total_dias', sql.Decimal(18, 0), total_dias);


            const result = await request.query(query);

            return result.recordset[0];

        } catch (error) {
            console.error("Error al registrar permiso:", error);
            throw error;
        }
    },

    obtenerPermisoPorId: async (id) => {
        try {
            const query = `
                SELECT 
                P.id,
                E.nombre AS empleado,
                TP.nombre AS tipo,
                P.dia_permiso,                
                P.hora_salida,
                P.hora_ingreso,
                P.total_horas,
                P.fecha_salida,
                P.fecha_ingreso,
                P.total_dias,
                P.estado
                FROM Permisos AS P
                INNER JOIN Empleados AS E 
                ON P.id_empleado = E.id
                INNER JOIN TipoPermiso AS TP
                ON P.id_tipo_permiso = TP.id
                WHERE P.id = @idPermiso`
            const pool = await poolCirmil;
            const permiso = await pool.request()
                .input("idPermiso", sql.Int, id)
                .query(query);

            let result = permiso.recordset[0];

            const fecha = new Date(result.dia_permiso);
            
            // Extraer día, mes y año
            const dia = fecha.getUTCDate().toString().padStart(2, '0');
            const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0'); // Meses en JS van de 0 a 11
            const anio = fecha.getUTCFullYear();

            result.dia_permiso = `${dia}/${mes}/${anio}`;
        
            return result;

        } catch (error) {
            console.error("Error en el modelo: ", error)
        }
    },

    obtenerUltimoPermiso: async () => {
        try {

            const query =
                `SELECT TOP 1 id
                FROM Permisos ORDER BY id DESC`

            const pool = await poolCirmil;
            const result = await pool.request().query(query);

            return result.recordset[0].id + 1;


        } catch (error) {
            console.error("Error en el modelo", error);
        }
    },

    obtenerPermisos: async () => {
        try {
            const query = `
                SELECT 
                P.id,
                E.nombre AS empleado,
                TP.nombre AS tipo,
                P.dia_permiso,
                P.hora_salida,
                P.hora_ingreso,
                P.total_horas,
                P.fecha_salida,
                P.fecha_ingreso,
                P.total_dias,
                P.fecha_creacion,
                P.estado
                FROM Permisos AS P
                INNER JOIN Empleados AS E 
                ON P.id_empleado = E.id
                INNER JOIN TipoPermiso AS TP
                ON P.id_tipo_permiso = TP.id
            `;
    
            const pool = await poolCirmil;
            const result = await pool.request().query(query);
    
            return result.recordset.map(permiso => {
                // Función para formatear fecha en DD/MM/YYYY
                const formatearFecha = (fecha) => {
                    if (!fecha) return null;
                    const date = new Date(fecha);
                    const dia = date.getUTCDate().toString().padStart(2, '0');
                    const mes = (date.getUTCMonth() + 1).toString().padStart(2, '0');
                    const anio = date.getUTCFullYear();
                    return `${dia}/${mes}/${anio}`;
                };
    
                // Función para formatear fecha con hora en DD/MM/YYYY HH:mm:ss
                const formatearFechaHora = (fecha) => {
                    if (!fecha) return null;
                    const date = new Date(fecha);
                    const dia = date.getUTCDate().toString().padStart(2, '0');
                    const mes = (date.getUTCMonth() + 1).toString().padStart(2, '0');
                    const anio = date.getUTCFullYear();
                    const horas = date.getUTCHours().toString().padStart(2, '0');
                    const minutos = date.getUTCMinutes().toString().padStart(2, '0');
                    const segundos = date.getUTCSeconds().toString().padStart(2, '0');
                    return `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
                };
    
                return {
                    ...permiso,
                    dia_permiso: formatearFecha(permiso.dia_permiso),
                    fecha_creacion: formatearFechaHora(permiso.fecha_creacion)
                };
            });
    
        } catch (error) {
            console.error("Error en el modelo: ", error);
        }
    },
    

    actualizarPermiso: async(id, value) => {
        
        try {
            const query = `UPDATE Permisos SET estado = @value WHERE id = @id`
            const pool = await poolCirmil;
    
            const result = await pool.request()
                .input("id", sql.Int, id)
                .input("value", sql.TinyInt, value)
                .query(query);
    
            return result;
        } catch (error) {
            console.error("Error en el modelo: ", error);
            throw error;
        }

    },

    // REPORTES

    obtenerTiposPermiso: async() => {

        const query = `SELECT * FROM TipoPermiso`
        const pool = await poolCirmil;
        const resultado = await pool.request().query(query);

        return resultado.recordset;
    },

    obtenerTiempoPermiso: async() => {

        const query = `SELECT * FROM TiempoPermiso`
        const pool = await poolCirmil;
        const resultado = await pool.request().query(query);

        return resultado.recordset;
    },

    getReport: async (dates) => {

        const { startDate, endDate } = dates;

        const query = `SELECT R.mptarjeta AS cedula, P.nombres, P.apellidos, 
                            STUFF(STUFF(R.fechatxt, 5, 0, '-'), 8, 0, '-') AS fecha, STUFF(R.horatxt, 3, 0, ':') AS hora
                            FROM tblregistros AS R
                            INNER JOIN tblpersonal AS P
                            ON R.mptarjeta=P.tarjeta
                            WHERE fechatxt>=@startDate AND fechatxt<=@endDate
                            ORDER BY R.fechatxt, R.horatxt`;

        const pool = await poolLince;
        const result = await pool.request()
            .input('startDate', sql.VarChar, startDate)
            .input('endDate', sql.VarChar, endDate)
            .query(query);

        return result.recordset;
    }
}

module.exports = model;