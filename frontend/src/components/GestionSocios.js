import React, { useState } from 'react';
import Reportes from './Reportes';
import BuscarSocio from './BuscarSocio';
import '../styles/GestionSocios.css'

const GestionSocios = () => {

    const [activeTab, setActiveTab] = useState(0);
    const tabs = [
        { label: 'Registro', component: <BuscarSocio /> },
        { label: 'Reportes', component: <Reportes /> }
    ]

    return (
        <div className='main-container'>
            <div className='main-container__title'>
                <h2 className='main-container__title--heading'>Registro de acceso</h2>
                <h3 className='main-container__title--subheading'>Servicios Múltiples</h3>
            </div>
            <div className='main-container__tabs'>
                {tabs.map((tab, index) =>
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.label}
                    </button>
                )}
            </div>
            <div className='main-container__content'>
                {tabs[activeTab].component}
            </div>

        </div>
    )
}

export default GestionSocios;