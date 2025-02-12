import React, { useEffect, useState } from "react";
import axios from "axios";

const Empleados = () => {

    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        const fetchEmpleados = async () => {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/talento-humano/empleados`)
            setEmpleados(response.data);
        } 

        fetchEmpleados();
    },[]);

    return (
        <div>
            <h1 className='text-2xl font-bold'>Empleados</h1>
            <input 
                type="search"
                placeholder="Buscar..."
            />
            <div className="grid grid-cols-4 gap-4 p-4 border mt-5">
                <div className="font-bold">Nombres</div>
                <div className="font-bold">Cédula</div>
                <div className="font-bold">Celular</div>
                <div className="font-bold">Acción</div>
                
                {empleados && empleados.map(empleado => (
                    <>
                        <div className="py-2">{empleado.nombre}</div>
                        <div className="py-2">{empleado.cedula}</div>
                        <div className="py-2">{empleado.celular}</div>
                        <div><button>
                                Editar
                            </button>
                        </div>
                        </>
                ))}
            
            </div>

        </div>
    )
}

export default Empleados;