const { poolPromise } = require('../config/db');
const bcrypt = require('bcrypt');
const sql = require('mssql');

const loginModel = {
  // Función para obtener las credenciales
  getCredentials: async ({ user, password }) => {
    try {
      const pool = await poolPromise;
      console.log('user:', user);
      const query = 'SELECT * FROM Users WHERE usuario = @user';
      const result = await pool
        .request()
        .input('user', sql.VarChar(50), user)
        .query(query);

      if (!result || result.recordset.length === 0) {
        console.log('No se encontró ningún usuario:', user);
        return null;
      }

      const dbUser = result.recordset[0];
      const matchPassword = await bcrypt.compare(password, dbUser.clave);

      if (!matchPassword) {
        console.log('Contraseña incorrecta');
        return null;
      }


      return dbUser;

    } catch (error) {
      console.error('Error al obtener las credenciales:', error);
      throw error;
    }
  },

  // Función para registrar un nuevo usuario
  registerUser: async ({ user, password, role }) => {
    try {
     
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const pool = await poolPromise;
      const query = `INSERT INTO Users (usuario, clave, rol_id) VALUES (@user, @password, @role)`;

      await pool
        .request()
        .input('user', sql.VarChar(50), user) // Usar un tamaño adecuado para el tipo de dato
        .input('password', sql.VarChar(255), hashedPassword) // Almacenar la contraseña con hash
        .input('role', sql.VarChar, role) // Almacenar la contraseña con hash
        .query(query);

      return true;
    } catch (error) {
      console.error('Error al registrar el usuario en modelo:', error);
      return false; // Retorna false en caso de error
    }
  },

  // Función para verificar si un usuario ya existe
  checkUserExists: async ({ user }) => {
    try {
      const pool = await poolPromise;
      const query = 'SELECT * FROM Users WHERE usuario = @user';
      const result = await pool
        .request()
        .input('user', sql.VarChar(50), user)
        .query(query);

      return result.recordset.length > 0; // Si existe, devuelve true

    } catch (error) {
      console.error('Error al verificar si el usuario existe:', error);
      return false;
    }
  }
};

module.exports = loginModel;
