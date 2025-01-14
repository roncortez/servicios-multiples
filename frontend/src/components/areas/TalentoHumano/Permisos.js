import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Permisos() {

    const [tipoPermiso, setTipoPermiso] = useState(null);
    const [tiempoPermiso, setTiempoPermiso] = useState(null);
    const [horaSalida, setHoraSalida] = useState("");
    const [horaIngreso, setHoraIngreso] = useState("");



    const [totalHoras, setTotalHoras] = useState(null);
    const [totalDias, setTotalDias] = useState(null);



    /*
    useEffect(()=> {
        const fetchTiposPermiso = async () => {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/talento-humano/permiso/tipo`)
            setTipoPermiso(response.data);
        } 

    } , [])
    */

    useEffect(() => {
        if (horaSalida && horaIngreso) {
            const salida = new Date(`1970-01-01T${horaSalida}:00`)
            const ingreso = new Date(`1970-01-01T${horaIngreso}:00`)
            const diferenciaMs = ingreso - salida;

            // Calculamos horas y rendodeamos a dos decimales
            const horas = (diferenciaMs / (1000 * 60 * 60)).toFixed(2);

            setTotalHoras(horas);
        }
    }, [horaSalida, horaIngreso])

    const resetEstados = () => {
        setHoraSalida("");
        setHoraIngreso("");
        setTotalHoras(null);
    }

    const handleTiempoPermisoChange = (value) => {
        setTiempoPermiso(value);
        resetEstados();
    }

    const handleSubmit = (e) => {
        /*
        const response = await axios.post(`${process.REACT_APP_BACKEND_URL}/api/talento-humano/permiso`, {
            tipoPermiso: tipoPermiso,
            tiempoPermiso: tiempoPermiso,
            horas: totalHoras,
            dias: totalDias
        })
            */
        e.preventDefault();
        alert("Esta seguro de que deseas guardar")
    }

    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <div className="bg-white p-5 shadow-lg rounded max-w-lg w-full overflow-y-auto">                <h1 className='text-2xl font-bold'>Crear</h1>
                <form onSubmit={handleSubmit} >
                    <div className="flex flex-col gap-1">
                        <div>
                            <div>
                                <h2 className='text-lg font-bold'>Empleado</h2>
                            </div>
                            <div>
                                <input
                                    className='border'
                                    placeholder='Buscar...'
                                />

                            </div>
                            <div></div>

                        </div>

                        <h2 className='text-lg font-bold'>Tipo</h2>
                        <div className="flex items-center gap-4">
                            <input
                                value="personal"
                                type="radio"
                                name="permiso"
                                onChange={(e) => setTipoPermiso(e.target.value)}
                                className="accent-blue-500"
                            />
                            <label className="text-gray-700 font-medium">Personal</label>
                        </div>
                        <div className="flex items-center gap-4">
                            <input
                                value="medico"
                                type="radio"
                                name="permiso"
                                onChange={(e) => setTipoPermiso(e.target.value)}
                                className="accent-blue-500"
                            />
                            <label className="text-gray-700 font-medium">Médico</label>
                            {tipoPermiso === "medico" && (
                                <span className="text-sm text-red-500 ml-4">Es necesario un certificado médico</span>
                            )}
                        </div>
                    </div>

                    {/* Sección para especificar tiempo*/}
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-lg font-bold'>Tiempo</h2>
                        <div className='flex items-center gap-4'>
                            <input
                                type="radio"
                                name="tiempo"
                                value="horas"
                                onChange={(e) => { handleTiempoPermisoChange(e.target.value) }}
                            />
                            <label>Horas</label>
                        </div>

                        <div className='flex items-center gap-4'>
                            <input
                                type="radio"
                                name="tiempo"
                                value="dias"
                                onChange={(e) => { handleTiempoPermisoChange(e.target.value) }}
                            />
                            <label>
                                Días
                            </label>
                        </div>

                        {tiempoPermiso === "horas" ?
                            <div className='flex gap-4'>
                                <div className='flex flex-col gap-1'>
                                    <label>Fecha</label>
                                    <input
                                        className="text-center border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                                        type='date'
                                    />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div>
                                        <h3>Período</h3>
                                    </div>
                                    <div className='flex justify-between gap-1'>
                                        <label>Salida:</label>
                                        <input
                                            className="text-center border border-gray-300 px-3 focus:outline-none focus:ring-2 w-32 focus:ring-blue-400"
                                            type='time'
                                            value={horaSalida}
                                            onChange={(e) => { setHoraSalida(e.target.value) }}
                                        />
                                    </div>
                                    <div className='flex justify-between gap-1'>
                                        <label>Ingreso:</label>
                                        <input
                                            className="text-center border border-gray-300 px-3 focus:outline-none focus:ring-2 w-32 focus:ring-blue-400"
                                            type='time'
                                            value={horaIngreso}
                                            onChange={(e) => { setHoraIngreso(e.target.value) }}
                                        />
                                    </div>

                                </div>
                                {totalHoras &&
                                    <div className='flex flex-col'>
                                        <div>Horas</div>
                                        <div>{totalHoras}</div>
                                    </div>

                                }
                            </div>
                            : tiempoPermiso === "dias" ?
                                <div className='flex gap-4'>
                                    <div className='flex flex-col gap-1'>
                                        <div>
                                            <h3>Período</h3>
                                        </div>

                                        <div className='flex gap-1 justify-between'>
                                            <label>Desde:</label>
                                            <input
                                                className='text-center border border-gray-300 px-3 w-32'
                                                type='date'
                                            />
                                        </div>

                                        <div className='flex gap-1 justify-between'>
                                            <label>Hasta:</label>
                                            <input
                                                className='text-center border border-gray-300 px-3 w-32 focus:outline-none'
                                                type='date'
                                            />
                                        </div>

                                        

                                    </div>
                                    {totalDias &&
                                        <div className='flex flex-col'>
                                            <div>Total</div>
                                            <div>{totalDias}</div>
                                        </div>
                                    }
                                </div> : null
                        }
                    </div>
                    <button 
                        type="submit"
                        className='border py-2 px-3 mx-auto block'
                    >
                        Guardar
                    </button>
                </form >
            </div>
        </div >
    )

}

export default Permisos;