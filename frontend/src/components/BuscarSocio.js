import React, { useState } from 'react';
import axios from 'axios';
import InfoSocio from './InfoSocio';

function BuscarSocio () {

    const [datos, setDatos] = useState('');
    const [socio, setSocio] = useState(null);
    const [mostrarInfo, setMostrarInfo] = useState(false);

    const buscarDatos = async (datos) => {
        try {
            const respuesta = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/socio/${datos}`);
            setSocio(respuesta.data);
            setMostrarInfo(true);
        } catch (error) {
            console.log('Error al obtener los datos:', error);
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
            {mostrarInfo &&
                <InfoSocio socio={socio} />
            }
        </div>
    )
}

export default BuscarSocio;