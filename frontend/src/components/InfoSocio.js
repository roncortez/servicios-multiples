import React, { useContext, useEffect, useState } from 'react';
import logo from '../assets/logo.png'
import '../styles/InfoSocio.css'
import { SocioContext } from '../context/SocioContext';

function InfoSocio() {

    const { socio, registro } = useContext(SocioContext);

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
                        <li className='mensaje-container__item'><span>Fuerza:</span> {socio.fuerza}</li>
                        <li className='mensaje-container__item'><span>Grado:</span> {socio.grado}</li>
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