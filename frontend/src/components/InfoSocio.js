import React, { useContext, useEffect, useState } from 'react';
import logo from '../assets/logo.png'
import '../styles/InfoSocio.css'
import { SocioContext } from '../context/SocioContext';

function InfoSocio() {

    const { socio, registro } = useContext(SocioContext);

    const BASE_URL = `${process.env.REACT_BACKEND_URL}/api/socio/foto`;

    return (
        <div className='mensaje-container'>
            <div className='mensaje-container__titulo-container'>
                <img className='mensaje-container__logo' src={logo}></img>
                <h2 className='mensaje-container__nombre'>Círculo Militar</h2>
                <h4 className='mensaje-container__slogan'>¡Mucho más que un buen club!</h4>
            </div>
            <h1 className='mensaje-container__bienvenida'>¡Bienvenido!</h1>
            {socio ? (
                <>
                    <ul className='mensaje-container__lista'>
                        <li className='mensaje-container__item foto-item'>
                            {socio.foto && (
                                <>
                                    <img
                                        className='mensaje-container__foto'
                                        src={socio.foto}
                                    />
                                </>
                            )}
                        </li>
                        <li className='mensaje-container__item'>Nombres: {socio.nombres}</li>
                        <li className='mensaje-container__item'>Fuerza: {socio.fuerza}</li>
                        <li className='mensaje-container__item'>Grado: {socio.grado}</li>
                        <li className='mensaje-container__item'>Edad: {socio.edad}</li>
                    </ul>

                </>
            ) : (
                <h2 className='mensaje-container__titulo'>Esperando datos...</h2>
            )}
            {registro && <h2>Su visita ha sido registrada</h2>}
        </div>
    );
}
export default InfoSocio;