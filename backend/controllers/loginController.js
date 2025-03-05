const loginModel = require('../models/loginModel');
require('dotenv').config(); // Esto carga las variables de entorno del archivo .env
const jwt = require('jsonwebtoken');

const loginController = {
    // Función para obtener las credenciales y hacer el login
    getCredentials: async (req, res) => {
        try {
            const { user, password } = req.body;
            const result = await loginModel.getCredentials({ user, password });

            if (!result) {
                return res.status(401).json({ message: 'Usuario o clave incorrectos' });
            }

            // Generar el token
            const token = jwt.sign(
                {
                    id: result.id,
                    user: result.usuario,
                    role: result.rol_id
                }, // Información que quieres almacenar en el token
                process.env.JWT_SECRET,                 // Llave secreta para firmar el token
                { expiresIn: '1h' }                     // Tiempo de expiración del token
            );

            return res.json({ token, message: 'Autenticación exitosa' });

        } catch (error) {
            console.error('Error en getCredentials:', error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    // Función para registrar un nuevo usuario
    registerUser: async (req, res) => {
        try {
            const { usuario, clave, role_id, email } = req.body;
            console.log('Datos recibidos', req.body);

            // Verificar que todos los campos existan
            if (!usuario || !clave || !role_id || !email) {
                console.log('Faltan datos en la solicitud');
                return res.status(400).json({ message: 'El nombre de usuario, la contraseña, el rol y el correo son obligatorios' });

            }

            //Aqui verifica si el usuario ya existe
            const userExists = await loginModel.getUserByUsername(usuario);
            if (userExists) {
                console.log('El usuario ya existe');
                return res.status(400).json({ message: 'El usuario ya existe' });
            }

            //Llama el modelo para poder registrar el usuario
            const result = await loginModel.registerUser({ usuario, clave, role_id, email });

            if (result) {
                console.log('Usuario creado');
                return res.status(201).json({ message: 'Usuario registrado exitosamente' });
            } else {
                console.log('Error al crear el usuario');
                return res.status(400).json({ message: 'Error al registrar el usuario' });
            }

        } catch (error) {
            console.error('Error en registerUser:', error);
            res.status(500).json({ message: 'Error en el servidor' });
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

            if (result.success) {
                return res.status(201).json({ message: "Usuario creado correctamente" });
            } else {
                return res.status(500).json({ error: "Error al crear usuario" });
            }
        } catch (error) {
            console.error("Error en createUsuarios:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    // Función para actualizar un usuario
    updateUsuario: async (req, res) => {
        try {
            const { id } = req.params;
            const { usuario, clave, role_id, email } = req.body;

            if (!usuario || !clave || !role_id || !email) {
                return res.status(400).json({ error: "Todos los campos son obligatorios" });
            }

            // Aquí llamamos la función del modelo
            const result = await loginModel.updateUsuario(id, usuario, clave, role_id, email);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            return res.status(200).json({ message: "Usuario actualizado correctamente" });
        } catch (error) {
            console.error("Error en updateUsuario:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    // Función para obtener todos los usuarios
    getUsuarios: async (req, res) => {
        try {
            const result = await loginModel.getUsuarios();
            return res.json(result);
        } catch (error) {
            console.error("Error en getUsuarios:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
};

module.exports = loginController;