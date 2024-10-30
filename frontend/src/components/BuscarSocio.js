import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { SocioContext } from '../context/SocioContext';
import '../styles/BuscarSocio.css'


function BuscarSocio() {

    const [tarjeta, setTarjeta] = useState('');
    const [cedula, setCedula] = useState('');
    const [invitados, setInvitados] = useState(0);
    const { socio, setSocio, registro, setRegistro } = useContext(SocioContext);
    const [error, setError] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null); // Para almacenar el ID del temporizador


    const buscarDatos = async (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario
        setError(null); // Reseteamos el error al iniciar la búsqueda
        setSocio(null);
        setRegistro(false); // Resetea `registro` al iniciar una nueva búsqueda

        if (cedula === '' && tarjeta === '') {
            setError('Llene uno de los dos campos');
            return;
        }



        try {

            let datosConsulta = tarjeta ? tarjeta : cedula;

            const respuesta = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/socio/${datosConsulta}`);
            setSocio(respuesta.data);

            setCedula(''); // Se limpia el input 
            setTarjeta('');


        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('No se encontraron resultados');
                setError('No se encontraron resultados');
            } else {
                console.error('Error en la solicitud:', error); // Muestra otros errores para depuración
            }
        }

    };

    const borrarCampos = () => {
        setCedula('');
        setTarjeta('');
        setSocio(null);
        setError(null);
        setRegistro(false);
    }

    const registrarVisita = async () => {
        // Limpiar el temporizador anterior, si existe
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        try {

            const id = setTimeout(() => {
                setSocio(null);
                setRegistro(false); // Elimina el socio
            }, 20000); // 20 segundos

            setTimeoutId(id); // Guarda el ID del temporizador

            if (socio) {

                await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/socio/registro`, {
                    id_socio: socio.id_socio,
                    invitados: invitados
                })
                setRegistro(true);
                setInvitados(0);
            }
            else {
                alert('Consulte un socio antes de registrar');
            }
        } catch (error) {

        }
    }


    useEffect(() => {
        return () => {
            // Limpia el temporizador si el componente se desmonta
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);


    return (
        <div className='registro'>
            <div className='registro__titulo'>
                <h2>Registro de acceso</h2>
                <h3>Servicios Múltiples</h3>
            </div>
            <div className='busqueda'>
                <form className='busqueda__form' onSubmit={buscarDatos}>
                    <h3>Por favor coloque la tarjeta en el lector o ingrese la cédula</h3>

                    <label className='busqueda__label'>Tarjeta: </label>
                    <input
                        className='busqueda__input'
                        value={tarjeta}
                        onChange={(e) => setTarjeta(e.target.value)}
                        disabled={cedula.length > 0}
                    />

                    <label className='busqueda__label'>Cédula:</label>
                    <input
                        className='busqueda__input'
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                        disabled={tarjeta.length > 0}
                        minLength={10}
                        maxLength={10}
                        autoFocus
                    />
                    {error && <p className='busqueda-form__error'>{error}</p>}

                    <button className='busqueda__button busqueda__button--consultar' type='submit'>Consultar</button>
                    <button className='busqueda__button busqueda__button--borrar' type='button' onClick={borrarCampos}>Borrar</button>
                </form>
                <div className='info'>
                    {socio ?
                        <>
                            <h3 className='info__titulo'>Datos:</h3>
                            <ul className='info__lista'>
                                <li className='info__item'>Nombres: {socio.nombres}</li>
                                <li className='info__item'>Grado: {socio.grado}</li>
                                <li className='info__item'>Fuerza: {socio.fuerza}</li>
                                <li className='info__item'>Edad: {socio.edad}</li>
                            </ul>

                            <div className='busqueda__registro'>
                                <button
                                    className='busqueda__button busqueda__button--registrar'
                                    type='submit'
                                    onClick={registrarVisita}
                                    disabled={registro}>
                                    Registrar
                                </button>
                                <div className='busqueda__registro-invitados'>
                                    <label>Nro. de invitados: </label>
                                    <input
                                        type='number'
                                        value={invitados}
                                        min='0'
                                        max='10'
                                        onChange={(e) => setInvitados(e.target.value)}
                                        disabled={registro}

                                    />
                                </div>
                            </div>
                            {registro &&
                                <>
                                    <p>Visita registrada</p>
                                    <p>Número de acompañantes: {invitados} </p>
                                </>
                            }

                        </> : <p>Esperando datos...</p>
                    }


                </div>

            </div>

        </div>
    )
}

export default BuscarSocio;