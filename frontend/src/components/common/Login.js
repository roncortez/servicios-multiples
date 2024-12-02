import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
            console.log(response.data.message); // "Autenticación exitosa"
            navigate('/dashboard')

        } catch (error) {
            console.log('Error al enviar datos:', error);
        }
    };

    return (
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
    )
}

export default Login;