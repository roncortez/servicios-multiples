const poolPromise = require('../config/db');


const reportModel = {
    getReport: async (startDate, endDate) => {
        try {
            const pool = poolPromise;
            const result = await pool.request()
                .input('startDate', sql.Date, startDate)
                .input('endDate', sql.Date, endDate)
                .query('SELECT * FROM Registros WHERE Fecha>=@startDate AND Fecha<=@endDate')
            return result.recordset;
        } catch(error) {
            console.log('Error en el modelo al obtener el reporte:', error);
        }
    }
        
}

module.exports = reportModel;