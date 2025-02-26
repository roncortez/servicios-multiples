import React, { useEffect, useState } from "react";
import { CgAddR } from "react-icons/cg";
import axios from "axios";
import ModalEmpleado from "./ModalEmpleado";

const Empleados = () => {

    const [empleados, setEmpleados] = useState([]);
    const [modalEmpleado, setModalEmpleado] = useState(false);

    useEffect(() => {
        const fetchEmpleados = async () => {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/talento-humano/empleados`)
            setEmpleados(response.data);
        }

        fetchEmpleados();
    }, []);



    return (
        <div className="p-10 relative">
            <div className="flex items-center justify-between w-full">
                <div className="">
                    <h1 className='text-2xl font-bold'>Empleados</h1>
                </div>
                <div className="flex items-center">
                    <button className="text-3xl" onClick={() => setModalEmpleado(true)}>
                        <CgAddR />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 p-4 border mt-5 overflow-y-auto max-h-[80vh]">
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
            <ModalEmpleado isOpen={modalEmpleado} onClose={() => setModalEmpleado(false)} />
        </div>
    )
}

export default Empleados;