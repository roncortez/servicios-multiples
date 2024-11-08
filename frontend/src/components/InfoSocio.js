import React, { useContext, useEffect, useState } from 'react';
import logo from '../assets/logo.png'
import aerea from '../assets/aerea.png'
import terrestre from '../assets/terrestre.png'
import armada from '../assets/armada.png'
import '../styles/InfoSocio.css'
import { SocioContext } from '../context/SocioContext';

function InfoSocio() {

    const { socio, registro } = useContext(SocioContext);

    const obtenerFuerza = (fuerza) => {
        if (!socio) return '';


        return socio.id_fuerza === fuerza ? 'resaltada' : 'opacada';
    };

    return (
        <div className='mensaje-container'>
            <div className='mensaje-container__titulo-container'>
                <img className='mensaje-container__logo' src={logo}></img>
                <h3 className='mensaje-container__nombre'>Círculo Militar</h3>
                <h4 className='mensaje-container__slogan'>¡Mucho más que un buen club!</h4>
            </div>
            <div className='mensaje-container__fuerzas'>
                <img
                    src={armada}
                    alt='armada'
                    className={obtenerFuerza(2)}
                />
                <img
                    src={terrestre}
                    alt='terrestre'
                    className={obtenerFuerza(1)}
                />
                <img
                    src={aerea}
                    alt='aerea'
                    className={obtenerFuerza(3)}
                />

            </div>
            <h2 className='mensaje-container__bienvenida'>¡Bienvenido!</h2>
            {socio ? (
                <>
                    <ul className='mensaje-container__lista'>
                        <li className='mensaje-container__item foto-item'>

                            {socio.fotoBase64 && (
                                <>
                                    <img
                                        className='mensaje-container__foto'
                                        src={socio.fotoBase64}
                                    />
                                </>
                            )}

                        </li>
                        <li className='mensaje-container__item'><span>Nombres:</span> {socio.nombres}</li>
                        {socio.id_socio && 
                            <>
                            <li className='mensaje-container__item'><span>Fuerza:</span> {socio.fuerza}</li>
                            <li className='mensaje-container__item'><span>Grado:</span> {socio.grado}</li>
                            </>
                        }
                        
                    </ul>

                </>
            ) : (
                <h2 className='mensaje-container__titulo'>Esperando datos...</h2>
            )}
            {registro && <h3 className='mensaje-container__registro'>Su visita ha sido registrada</h3>}
        </div>
    );
}
export default InfoSocio;