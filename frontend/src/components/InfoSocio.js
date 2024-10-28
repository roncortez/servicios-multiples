import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/InfoSocio.css'

function InfoSocio( { socio }) {

    return (
        <div>
            <h2>¡Bienvenido al Círculo Militar!</h2>
            <ul>
                <li>Nombres: {socio.nombres}</li> 
                <li>Fuerza: {socio.fuerza}</li>
                <li>Edad: {socio.edad}</li>  
            </ul>
            <h3>Su visita ha sido registrada</h3>
        </div>
    )
}

export default InfoSocio;