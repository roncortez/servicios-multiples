const sql = require('mssql');
const { poolPromise } = require('../config/dbLat');

const factModel = {
    getArticulos: async() => {
        try{
            const pool = poolPromise;
            const query = 'SELECT * FROM Articulo';
            const result = (await pool).request().query(query);
            return result;

        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = factModel;
