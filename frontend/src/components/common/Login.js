import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrige la importación, no lleva llaves
import { roleRoutes } from '../config/roleRoutes';
import '../../styles/common/Login.css'

const Login = () => {
    const [username, setUsername] = useState(''); // Cambiado de "user" a "username"
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login, logout } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
                user: username, // Usa "username" aquí
                password
            });

            const token = response.data.token;
            localStorage.setItem('authToken', token); // Guarda el token en localStorage
            
            const decoded = jwtDecode(token); // Decodifica el token
            const user = {
                user: decoded.user, // Suponiendo que "user" está en el token
                role: decoded.role
            };

            login(user);

            const role = roleRoutes[user.role];
            if (role) {
                navigate(`${role.routes[0].path}`); // Redirige a la primera ruta del rol
            }

            console.log('Ruta inicial:', role.routes[0].path);
            console.log('Mensaje:', response.data.message); // Mensaje de éxito
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <div className='border mx-auto my-auto p-10 bg-gray-100'>
            <div className='flex flex-col items-center justify-center mb-5'>
                <h2 className='font-bold text-sm'>Círculo Militar</h2>
                <span className='font-bold text-sm'>¡Mucho más que un buen club!</span>
            </div>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form__group'>
                    <label className='form__label'>Usuario</label>
                    <input
                        className='p-2 border'
                        type='text'
                        placeholder='Ingrese el usuario'
                        value={username} // Cambiado a "username"
                        onChange={(e) => setUsername(e.target.value)} // Cambiado a "setUsername"
                        required
                    />
                </div>
                <div className='form__group'>
                    <label className='form__label'>Contraseña</label>
                    <input
                        className='p-2 border'
                        type='password'
                        placeholder='Ingrese la contraseña'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button 
                    type='submit' 
                    className='bg-blue-900 text-white py-2 rounded-md hover:bg-blue-600'
                >
                    Ingresar
                </button>
            </form>
        </div>
    );
};

export default Login;
