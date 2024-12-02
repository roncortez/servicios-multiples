import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onRegisterSuccess }) => {
    // Definir los estados para el nombre de usuario, la contraseña y la confirmación de la contraseña
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [role, setRole] = useState(''); 

    // Manejar el submit del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        // Hacer la solicitud POST a la API de registro
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, {
                user,
                password,
                role
            });

            // Si el registro es exitoso, manejar la respuesta
            onRegisterSuccess(response.data); // Pasar cualquier dato que necesites al componente padre
            console.log('Usuario registrado exitosamente');
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            setError(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuario</label>
                    <input 
                        type="text" 
                        placeholder="Ingrese su nombre de usuario" 
                        value={user}
                        onChange={(e) => setUser(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input 
                        type="password" 
                        placeholder="Ingrese su contraseña" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Confirmar Contraseña</label>
                    <input 
                        type="password" 
                        placeholder="Confirme su contraseña" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Rol</label>
                    <input 
                        type="text" 
                        placeholder="Ingrese el rol" 
                        value={role}
                        onChange={(e) => setRole(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Registrar</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Register;
