const { poolPromise } = require('../config/db');
const sql = require('mssql'); // Asegúrate de que sql esté importado

const reportModel = {
    getReport: async (dates) => {
        const { startDate, endDate } = dates;
        console.log('startDate:', startDate);
        console.log('endDate:', endDate);
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('startDate', sql.Date, startDate)
                .input('endDate', sql.Date, endDate)
                .query(
                    `
                    SELECT 
                    S.nombres AS nombres, 
                    S.cedula AS cedula,
                    'Socio' AS tipo,
                    FORMAT(R.fecha_hora, 'yyyy-MM-dd') AS fecha, 
                    FORMAT(R.fecha_hora, 'HH:mm:ss') AS hora,  
                    R.deuda_aportes,
                    R.invitados AS invitados
                    FROM Registros AS R 
                    INNER JOIN socios AS S
                    ON R.id_socio = S.id_socio
                    WHERE CONVERT(DATE, R.fecha_hora)  >= @startDate
                    AND CONVERT (DATE, R.fecha_hora) <= @endDate
                    
                    UNION ALL

                    SELECT 
                    D.nombres AS nombres,
                    D.cedula AS cedula,
                    'Dependiente' AS tipo,
                    FORMAT(R.fecha_hora, 'yyyy-MM-dd') AS fecha, 
                    FORMAT(R.fecha_hora, 'HH:mm:ss') AS hora,  
                    NULL AS deuda_aportes,
                    R.invitados AS invitados
                    FROM Registros AS R 
                    INNER JOIN dependientes AS D
                    ON R.id_socio = D.iddep    
                    WHERE CONVERT(DATE, R.fecha_hora)  >= @startDate
                    AND CONVERT (DATE, R.fecha_hora) <= @endDate
                    `
                )
            return result.recordset;
        } catch (error) {
            console.log('Error en el modelo al obtener el reporte:', error);
            throw error;
        }
    }
}

module.exports = reportModel;