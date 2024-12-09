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
                { id: result.id, user: result.usuario, role: result.rol_id }, // Información que quieres almacenar en el token
                process.env.JWT_SECRET,                 // Llave secreta para firmar el token
                { expiresIn: '1h' }                     // Tiempo de expiración del token
            );

            return res.json({ token, message: 'Autenticación exitosa' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    // Función para registrar un nuevo usuario
    registerUser: async (req, res) => {
        try {
            const { user, password, role } = req.body;

            // Verificar que ambos campos existan
            if (!user || !password) {
                return res.status(400).json({ message: 'El nombre de usuario y la contraseña son obligatorios' });
            }

            const userExists = await loginModel.checkUserExists({ user })

            if (userExists) {
                return res.status(400).json({ message: 'El usuario ya existe' });
            }

            const result = await loginModel.registerUser({ user, password, role });

            if (result) {
                console.log('Usuario creado');
                return res.status(201).json({ message: 'Usuario registrado exitosamente' });
            } else {
                return res.status(400).json({ message: 'Error al registrar el usuario' });
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    }
};

module.exports = loginController;
