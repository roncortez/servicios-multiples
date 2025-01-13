const { poolPromise } = require('../../config/dbLat');
const sql = require('mssql');

const empleadoModel = {

    getEmpleados: async () => {
        const query = "SELECT Nombre, Apellido, Cedula, Celular FROM Personal ORDER BY Nombre"
        const pool = await poolPromise;
        const result = await pool.request().query(query);

        return result.recordset;
    }
}

module.exports = empleadoModel;