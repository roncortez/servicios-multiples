import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { SocioContext } from '../context/SocioContext';
import GestionSocios from './GestionSocios';
import '../styles/BuscarSocio.css';

function BuscarSocio() {
    const [datoConsulta, setDatoConsulta] = useState('');
    const [campoActivo, setCampoActivo] = useState('');
    const [invitados, setInvitados] = useState(0);
    const { socio, setSocio, registro, setRegistro } = useContext(SocioContext);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [esperandoDatos, setEsperandoDatos] = useState(true);
    const cedulaRef = useRef(null); // Referencia para el campo de cédula

    // Ref para el botón de registro
    const registrarButtonRef = useRef(null);

    const buscarDatos = async (e) => {
        e.preventDefault();
        setError(null);
        setSocio(null);
        setRegistro(false);
        setCargando(true);

        if (!datoConsulta) {
            setError('Llene uno de los dos campos');
            setCargando(false);
            return;
        }

        const campo = campoActivo;

        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/api/socio/buscar`;
            const respuesta = await axios.post(url, {
                [campo]: datoConsulta
            });
            setSocio(respuesta.data);
            setCampoActivo('');
            setDatoConsulta('');
            setCargando(false);
        } catch (error) {
            setCargando(false);
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
        setInvitados(0);
        setCargando(false);
        setEsperandoDatos(true);
        // Enfoca el campo de cédula después de borrar
        if (cedulaRef.current) {
            cedulaRef.current.focus();
        }
    };

    const manejarCambio = (campo, datoConsulta) => {
        if (datoConsulta === '') {
            setCampoActivo('');
            setError(false);
            setCargando(false);
        } else {
            setCampoActivo(campo);
        }
        setDatoConsulta(datoConsulta);
    };

    const registrarVisita = async (e) => {
        e.preventDefault();
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        try {
            const id = setTimeout(() => {
                setSocio(null);
                setRegistro(false);
                setInvitados(0);
            }, 20000);

            setTimeoutId(id);

            if (socio) {

                const payload = {
                    id_usuario: socio.id_socio !== null ? socio.id_socio: socio.iddep,
                    invitados: invitados
                }

                await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/socio/registro`, payload);
                setRegistro(true);
                // Enfoca automáticamente el campo de cédula después de registrar
                if (cedulaRef.current) {
                    cedulaRef.current.focus();
                }
            } else {
                alert('Consulte un socio antes de registrar');
            }
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className='search__container'>
            <div className='search__section'>
                <form className='search__form-section' onSubmit={buscarDatos}>
                    <h2 className='search__title'>POR FAVOR LLENE UNO DE LOS CAMPOS</h2>

                    <label className='search__label'>Tarjeta:</label>
                    <input
                        className='search__input'
                        name="num_tarjeta"
                        value={campoActivo === 'num_tarjeta' ? datoConsulta : ''}
                        onChange={(e) => manejarCambio('num_tarjeta', e.target.value)}
                        disabled={campoActivo && campoActivo !== 'num_tarjeta'}
                    />

                    <label className='search__label'>Cédula:</label>
                    <input
                        className='search__input'
                        name="cedula"
                        value={campoActivo === 'cedula' ? datoConsulta : ''}
                        onChange={(e) => manejarCambio('cedula', e.target.value)}
                        disabled={campoActivo && campoActivo !== 'cedula'}
                        minLength={10}
                        maxLength={10}
                        autoFocus
                    />

                    <label className='search__label'>Nombres:</label>
                    <input
                        className='search__input'
                        type="text"
                        name="nombres"
                        value={campoActivo === 'nombres' ? datoConsulta : ''}
                        onChange={(e) => manejarCambio('nombres', e.target.value)}
                        disabled={campoActivo && campoActivo !== 'nombres'}
                    />

                    <label className='search__label'>F.A.F (Solo para socios):</label>
                    <input
                        className='search__input'
                        name="faf"
                        value={campoActivo === 'faf' ? datoConsulta : ''}
                        onChange={(e) => manejarCambio('faf', e.target.value)}
                        disabled={campoActivo && campoActivo !== 'faf'}
                        maxLength={6}
                    />

                    {error && <p>{error}</p>}
                    {!error && cargando && <p>Cargando...</p>}

                    <button className='search__button search__button--submit' type="submit">Consultar</button>
                </form>

                {socio ? (
                    <div className='search__data-section'>
                        <h2 className='search__title'>DATOS</h2>
                        <div>
                            <ul className='search__list'>
                                <li className='search__item'>
                                    <div className='search__data-img'>
                                        <img className='search__item-img' src={socio.fotoBase64} alt="Foto del socio" />
                                    </div>
                                    <div className='search__data-text'>
                                        <div className='search__text'>
                                            <strong>Nombres</strong>
                                            <span>{socio.nombres}</span>
                                        </div>
                                        <div className='search__text'>
                                            <strong>Edad</strong>
                                            <span>{socio.edad}</span>
                                        </div>
                                        {socio.id_socio && (
                                            <>
                                                <div className='search__text'>
                                                    <strong>Grado</strong>
                                                    <span>{socio.grado}</span>
                                                </div>
                                                <div className='search__text'>
                                                    <strong>Fuerza</strong>
                                                    <span>{socio.fuerza}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>                           
                                </li>
                                { socio.deuda_apo != null && Number(socio.deuda_apo) > 0 && (
                                        <div className='search__text search__text--warning'>Aportes pendientes</div>
                                    )}
                            </ul>

                        </div>

                        <form className='search__form-section search__form-section--register' onSubmit={registrarVisita}>
                            <div>
                                <label className='search__label search__label--number'>Nro. de invitados:</label>
                                <input
                                    className='search__input search__input--number'
                                    type="number"
                                    value={invitados}
                                    min="0"
                                    max="6"
                                    onChange={(e) => setInvitados(e.target.value)}
                                    disabled={registro}
                                />
                            </div>
                            <button className='search__button search__button--submit' type="submit" disabled={registro} ref={registrarButtonRef}>
                                Registrar
                            </button>
                        </form>

                        <div>
                            {registro && (
                                <>
                                    <p>Visita registrada</p>
                                    <p>Número de invitados: {invitados}</p>
                                </>
                            )}
                        </div>
                    </div>
                ) : (
                    error ? (
                        <p>{error}</p>
                    ) : (
                        <div className='search__data-section'>
                            <h2>Esperando datos...</h2>
                        </div>
                    )
                )}
            </div>
            <button className='search__button search__button--delete' type="button" onClick={borrarCampos}>Borrar</button>

        </div>
    );

}

export default BuscarSocio;
