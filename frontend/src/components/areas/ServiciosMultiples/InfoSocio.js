import React, { useContext, useEffect, useState } from 'react';
import logo from '../../../assets/logo.png'
import aerea from '../../../assets/aerea.png'
import terrestre from '../../../assets/terrestre.png'
import armada from '../../../assets/armada.png'
import '../../../styles/InfoSocio.css'
import { SocioContext } from '../../../context/SocioContext';

function InfoSocio() {

    const { socio, registro } = useContext(SocioContext);

    const obtenerFuerza = (fuerza) => {
        if (!socio) return '';


        return socio.id_fuerza === fuerza ? 'resaltada' : 'opacada';
    };

    return (
        <div className='fixed inset-0 z-10 flex items-center justify-center'>
        <div className='bg-white p-5 rounded-lg shadow-lg h-screen w-screen flex flex-col items-center'>
            <div className='h-1/3 flex flex-col justify-start gap-10 w-full'>
                <div className='flex flex-col justify-center items-center'>
                    <img className='mensaje-container__logo' src={logo}></img>
                    <h3 className='font-bold'>Círculo Militar</h3>
                    <h4 className='font-semibold text-sm'>¡Mucho más que un buen club!</h4>
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
            </div>
            <div className='h-2/3 flex flex-col items-center justify-center gap-5'>
            <h2 className='font-semibold text-3xl'>¡Bienvenido!</h2>
            {socio ? (
                <>
                    <ul className='mensaje-container__lista'>
                        <li className='mensaje-container__item foto-item'>

                            {socio.fotoBase64 && (
                                <>
                                    <img
                                        className='w-56 h-64 object-cover rounded-full border-4 border-blue-500 shadow-lg'
                                        src={socio.fotoBase64}
                                    />
                                </>
                            )}

                        </li>
                    </ul>
                    <ul className='justify-evenly flex flex-col'>
                        <li className='mensaje-container__item'><span>Nombres:</span> {socio.nombres}</li>
                        {socio.id_socio && 
                            <>
                            <li className='mensaje-container__item'>
                                <span>Fuerza:</span> {socio.fuerza}
                            </li>
                            <li className='mensaje-container__item'>
                                <span>Grado:</span> {socio.grado}
                            </li>
                            </>
                        }
                        
                    </ul>

                </>
            ) : (
                <h2 className='text-xl'>Esperando datos...</h2>
            )}
            {registro && <h3 className='mensaje-container__registro'>Su visita ha sido registrada</h3>}
        </div>
        </div>
        </div>
    );
}
export default InfoSocio;