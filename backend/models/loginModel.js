const { poolPromise } = require('../config/db');

const loginModel = {
  getCredentials: async ({ email }) => {
    try {
      const pool = await poolPromise;

      // Consulta SQL
      const query = 'SELECT * FROM Users WHERE email = @email';
      const result = await pool
        .request()
        .input('email', email) // Parámetro SQL seguro
        .query(query);

      // Verificar si hay resultados
      if (!result || result.recordset.length === 0) {
        console.log('No se encontró ningún usuario con el email:', email);
        return null;
      }

      // Retornar el primer registro encontrado
      return result.recordset[0];
    } catch (error) {
      console.error('Error al obtener las credenciales:', error);
      throw error; // Propagar el error para manejo en el controlador
    }
  },
};

module.exports = loginModel;
