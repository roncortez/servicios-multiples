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
            {socio ? (
                <>         
                    <h2 className='mensaje-container__bienvenida'>¡Bienvenido!</h2>
                    <ul className='mensaje-container__lista'>
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