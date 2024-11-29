import React, { useState } from 'react';
import axios from 'axios';
// Login es componente hijo
// No tiene acceso a la lógica de autenticación

const Login = ({ onLoginSuccess }) => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const response = axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
                email,
                password         
            });

            const token = response.data;
            console.log('Token recibido: ', token);
            onLoginSuccess(token);

        } catch (error) {
            console.log('Error al enviar datos:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Correo electrónico</label>
                <input 
                    type='email'
                    placeholder='Ingrese el correo'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
            <button>Olvidé mi contraseña</button>
            <button type='submit'>Ingresar</button>
        </form>
    )
}

export default Login;