const { poolPromise } = require('../config/db');
const bcrypt = require('bcryptjs');
const sql = require('mssql');

const loginModel = {
    // Función para registrar un nuevo usuario
    registerUser: async ({ usuario, clave, role_id, email }) => {
      try {
          const pool = await poolPromise;
          const hashedPassword = await bcrypt.hash(clave, 10); // Encriptar la contraseña
          const query = `INSERT INTO Users (usuario, clave, rol_id, email) VALUES (@usuario, @clave, @rol_id, @email)`;
          await pool.request()
              .input('usuario', sql.VarChar, usuario)
              .input('clave', sql.VarChar, hashedPassword)
              .input('rol_id', sql.Int, role_id)
              .input('email', sql.VarChar, email)
              .query(query);
          return true;
      } catch (error) {
          console.error('Error al registrar el usuario:', error);
          return false;
      }
  },


    // Función para crear un nuevo usuario
    createUsuarios: async (req, res) => {
        try {
            const { usuario, clave, role_id, email } = req.body;

            if (!usuario || !clave || !role_id || !email) {
                return res.status(400).json({ error: "Todos los campos son obligatorios" });
            }

            const result = await loginModel.createUsuarios(usuario, clave, role_id, email);

            if (!result) {
                return res.status(500).json({ error: "No se pudo crear el usuario" });
            }

            return res.status(201).json({ message: "Usuario creado correctamente", data: result });
        } catch (error) {
            console.error("Error en crear Usuario", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    getUserByUsername: async (usuario) => {
      try {
          const pool = await poolPromise;
          const query = `SELECT * FROM Users WHERE usuario = @usuario`;
          const result = await pool.request()
              .input('usuario', sql.VarChar, usuario)
              .query(query);
  
          return result.recordset[0]; // Devuelve el primer usuario encontrado
      } catch (error) {
          console.error("Error en getUserByUsername:", error);
          return null;
      }
  },  

    // Función para actualizar un usuario
    updateUsuario: async (id, usuario, clave, role_id, email) => {
      try {
          const pool = await poolPromise;
          const hashedPassword = await bcrypt.hash(clave, 10); // Encriptar la nueva contraseña
          const query = `UPDATE Users SET usuario = @usuario, clave = @clave, rol_id = @rol_id, email = @email WHERE id = @id`;
          const result = await pool.request()
              .input('id', sql.Int, id)
              .input('usuario', sql.VarChar, usuario)
              .input('clave', sql.VarChar, hashedPassword)
              .input('rol_id', sql.Int, role_id)
              .input('email', sql.VarChar, email)
              .query(query);
          return { affectedRows: result.rowsAffected[0] };
      } catch (error) {
          console.error('Error en updateUsuario:', error);
          return { error };
      }
  },

    // Función para obtener todos los usuarios
    getUsuarios: async () => {
      try {
          const pool = await poolPromise;
          const query = `SELECT id, usuario, rol_id, email FROM Users`;
          const result = await pool.request().query(query);
          return result.recordset;
      } catch (error) {
          console.error('Error en getUsuarios:', error);
          return { error };
      }
  }
};

module.exports = loginModel;