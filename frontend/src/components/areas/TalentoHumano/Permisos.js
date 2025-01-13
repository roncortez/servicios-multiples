import React, { useState } from 'react';

function Permisos() {

    const [horas, setHoras] = useState(null);
    const [dias, setDias] = useState(null);

    const calculateHours = () => {

    }

    return (
        <div>
            <h1 className='text-2xl font-bold'>Permisos</h1>
            <form>
                <h2 className='text-lg font-bold'>Tipo</h2>
                <div>
                    <label>Personal</label>
                    <input
                        type='radio'
                        name="permiso"
                    />
                    <label>Médico</label>
                    <input
                        name="permiso"
                        type='radio'
                    />
                </div>
                <h2 className='text-lg font-bold'>Tiempo</h2>
                <div>

                    <h3>Horas</h3>
                    <div>
                        <label>Fecha</label>
                        <input
                            type='date'
                        />
                        <label>Salida</label>
                        <input
                            type='time'
                        />
                        <label>Ingreso</label>
                        <input
                            type='time'
                        />
                        {horas &&
                        <span>Total: { }</span>
                    }
                    </div>
                    <h3>Días</h3>
                    <div>
                        <label>Desde</label>
                        <input
                            type='date'
                        />
                        <label>Hasta</label>
                        <input
                            type='date'
                        />
                        {horas &&
                        <span>Total: { }</span>
                    }
                    </div>

                </div>
            </form>
        </div>
    )

}

export default Permisos;