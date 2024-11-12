import React, { useState } from 'react';
import Reportes from './Reportes';
import BuscarSocio
    from './BuscarSocio';
const GestionSocios = () => {

    const [activeTab, setActiveTab] = useState(0);
    const tabs = [
        { label: 'Búsqueda', component: <BuscarSocio /> },
        { label: 'Reportes', component: <Reportes /> }
    ]

    return (
        <div>
            <div className='registro__titulo'>
                <h2>Registro de acceso</h2>
                <h3>Servicios Múltiples</h3>
            </div>
            {tabs.map((tab, index) =>
                <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                >
                    {tab.label}
                </button>
            )}
            <div>
                {tabs[activeTab].component}
            </div>
        </div>
    )
}

export default GestionSocios;