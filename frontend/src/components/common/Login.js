import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { roleRoutes } from '../config/roleRoutes';

// Login es componente hijo
// No tiene acceso a la lógica de autenticación

const Login = ({ onLoginSuccess }) => {

    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
                user,
                password
            });

            const token = response.data.token;
            // Si la autenticación es exitosa, guarda el token
            localStorage.setItem('authToken', token);

            const decoded = jwtDecode(token);
            const userRole = decoded.role;

            const role = roleRoutes[userRole];

            if (role) {
                onLoginSuccess(userRole);
                navigate(`/${role.routes[0].path}`)
            }

            console.log(role.routes[0].path);
            console.log(response.data.message); // "Autenticación exitosa"



        } catch (error) {
            console.log('Error al enviar datos:', error);
        }
    };

    return (
        <div>
            <h2>Círculo Militar</h2>
            <h3>Mucho más que un buen club</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuario</label>
                    <input
                        type='text'
                        placeholder='Ingrese el usuario'
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input
                        type='password'
                        placeholder='Ingrese la contraseña'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type='submit'>Ingresar</button>
            </form>
        </div>
    )
}

export default Login;