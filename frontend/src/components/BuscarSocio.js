import React, { useState } from 'react';
import axios from 'axios';
import InfoSocio from './InfoSocio';

function BuscarSocio () {

    const [datos, setDatos] = useState('');
    const [socio, setSocio] = useState(null);
    const [error, setError] = useState(null);
    const [mostrarInfo, setMostrarInfo] = useState(false);

    const buscarDatos = async (datos) => {
        setError(null); // Reseteamos el error al iniciar la búsqueda
        setSocio(null);
        setMostrarInfo(false);
        try {
            const respuesta = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/socio/${datos}`);
            setSocio(respuesta.data);
            setMostrarInfo(true);
        } catch (error) {
            if(error.response && error.response.status === 404) {
                console.log('No se encontraron resultados');
                setError('No se encontraron resultados');
            }
        }
       
    }

    const handleChange = (e) => {
        setDatos(e.target.value)
    }

    return (
        <div>
            <p>Por favor coloque la tarjeta en el lector</p>
            <label>
            Tarjeta:
            </label>
            <input 
                value={datos}
                onChange={handleChange}
                onBlur={() => buscarDatos(datos)}
            />

            {error && <p>{error}</p>}

            {socio &&
                <InfoSocio socio={socio} />
            }
        </div>
    )
}

export default BuscarSocio;