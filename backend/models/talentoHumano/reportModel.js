const { poolPromise } = require('../../config/dbLince');
const sql = require('mssql');

const reportModel = {
    getReport: async (dates) => {
        //const { startDate, endDate } = dates;
        const query = 'SELECT horatxt, fechatxt, mptarjeta FROM tblregistros';
        const pool = await poolPromise;
        const result = await pool.request().query(query);

        return result.recordset;
        /*
        const result = await pool
            .request()
            .input('startDate', sql.Date, startDate)
            .input('endDate', sql.Date, endDate)
            .query(query)
        */

        
    }
}

module.exports = reportModel;