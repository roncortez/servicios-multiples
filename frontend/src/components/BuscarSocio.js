import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { SocioContext } from '../context/SocioContext';
import '../styles/BuscarSocio.css';

function BuscarSocio() {
    const [datoConsulta, setDatoConsulta] = useState('');
    const [campoActivo, setCampoActivo] = useState('');
    const [invitados, setInvitados] = useState(0);
    const { socio, setSocio, registro, setRegistro } = useContext(SocioContext);
    const [error, setError] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);

    const buscarDatos = async (e) => {
        e.preventDefault();
        setError(null);
        setSocio(null);
        setRegistro(false);

        if (!datoConsulta) {
            setError('Llene uno de los dos campos');
            return;
        }

        // Determinar el campo a buscar basado en el campo activo
        const campo = campoActivo;

        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/api/socio/buscar`;
            const respuesta = await axios.post(url, {
                [campo]: datoConsulta // Usar el name del input como clave
            });
            setSocio(respuesta.data);
            setDatoConsulta('');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError('No se encontraron resultados');
            } else {
                console.error('Error en la solicitud:', error);
            }
        }
    };

    const borrarCampos = () => {
        setDatoConsulta('');
        setCampoActivo('');
        setSocio(null);
        setError(null);
        setRegistro(false);
    };

    const manejarCambio = (campo, datoConsulta) => {
        setCampoActivo(campo);
        setDatoConsulta(datoConsulta);
    };

    const registrarVisita = async () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        try {
            const id = setTimeout(() => {
                setSocio(null);
                setRegistro(false);
            }, 20000);

            setTimeoutId(id);

            if (socio) {
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/socio/registro`, {
                    id_socio: socio.id_socio,
                    invitados: invitados
                });
                setRegistro(true);
                setInvitados(0);
            } else {
                alert('Consulte un socio antes de registrar');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        return () => {
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
                        name='num_tarjeta'
                        value={campoActivo === 'num_tarjeta' ? datoConsulta : ''}
                        onChange={(e) => manejarCambio('num_tarjeta', e.target.value)}
                        disabled={campoActivo && campoActivo !== 'num_tarjeta'}
                    />

                    <label className='busqueda__label'>Cédula:</label>
                    <input
                        className='busqueda__input'
                        name='cedula'
                        value={campoActivo === 'cedula' ? datoConsulta : ''}
                        onChange={(e) => manejarCambio('cedula', e.target.value)}
                        disabled={campoActivo && campoActivo !== 'cedula'}
                        minLength={10}
                        maxLength={10}
                    />

                    <label className='busqueda__label'>Nombres:</label>
                    <input
                        type='text'
                        className='busqueda__input'
                        name='nombres'
                        value={campoActivo === 'nombres' ? datoConsulta : ''}
                        onChange={(e) => manejarCambio('nombres', e.target.value)}
                        disabled={campoActivo && campoActivo !== 'nombres'}
                    />

                    <label className='busqueda__label'>FAF:</label>
                    <input
                        className='busqueda__input'
                        name='faf'
                        value={campoActivo === 'faf' ? datoConsulta : ''}
                        onChange={(e) => manejarCambio('faf', e.target.value)}
                        disabled={campoActivo && campoActivo !== 'faf'}
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
                                <li className='info__item foto'><img src={socio.fotoBase64}/></li>
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
    );
}

export default BuscarSocio;
