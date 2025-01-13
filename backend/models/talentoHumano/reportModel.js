const { poolPromise } = require('../../config/dbLince');
const sql = require('mssql');

const reportModel = {
    getReport: async (dates) => {
        
        const { startDate, endDate } = dates;

        const query =   `SELECT R.mptarjeta AS cedula, P.nombres, P.apellidos, 
                        STUFF(STUFF(R.fechatxt, 5, 0, '-'), 8, 0, '-') AS fecha, STUFF(R.horatxt, 3, 0, ':') AS hora
                        FROM tblregistros AS R
                        INNER JOIN tblpersonal AS P
                        ON R.mptarjeta=P.tarjeta
                        WHERE fechatxt>=@startDate AND fechatxt<=@endDate
                        ORDER BY R.fechatxt, R.horatxt`;

        const pool = await poolPromise;
        const result = await pool.request()
            .input('startDate', sql.VarChar, startDate)
            .input('endDate', sql.VarChar, endDate)
            .query(query);

        return result.recordset;        
    }
}

module.exports = reportModel;