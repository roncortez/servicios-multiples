import React, { useEffect, useState } from "react";
import axios from "axios";
import Solicitud from './Solicitud'
import PdfPermiso from "../../common/PdfPermiso";
const Permisos = () => {

    const [permisos, setPermisos] = useState([]);

    const obtenerPermisos = async () => {
        const respuesta = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/talento-humano/permisos`);
        setPermisos(respuesta.data);
    }
    useEffect(() => {
        obtenerPermisos();
    }, [])

    const manejarValidacion = async (value, id) => {

        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/talento-humano/permiso/${id}`, {
            value: value
        })

        obtenerPermisos();

    }

    return (
        <div className="p-10 border  overflow-y-auto max-h-[80vh]">
            <div className="grid grid-cols-11 font-semibold border gap-x-5"
                style={{ gridTemplateColumns: "50px repeat(11, 1fr)" }}
            >
                <div className="p-2">N°</div>
                <div className="p-2">Empleado</div>
                <div className="p-2">Tipo</div>
                <div className="p-2">Día del permiso</div>
                <div className="p-2">Hora de salida</div>
                <div className="p-2">Hora de ingreso</div>
                <div className="p-2">Fecha de salida</div>
                <div className="p-2">Fecha de ingreso</div>
                <div className="p-2">Fecha de creación</div>
                <div className="p-2">Estado</div>
                <div className="p-2">Imprimir</div>
            </div>

            {permisos && (permisos.map(permiso =>
                <div
                    className="grid grid-cols-11 border gap-x-5"
                    style={{ gridTemplateColumns: "50px repeat(11, 1fr)" }}
                    key={permiso.id}
                >
                    <div className="p-2">{permiso.id}</div>
                    <div className="p-2">{permiso.empleado}</div>
                    <div className="p-2">{permiso.tipo}</div>
                    <div className="p-2">{permiso.dia_permiso}</div>
                    <div className="p-2">{permiso.hora_salida}</div>
                    <div className="p-2">{permiso.hora_ingreso}</div>
                    <div className="p-2">{permiso.fecha_salida}</div>
                    <div className="p-2">{permiso.fecha_ingreso}</div>
                    <div className="p-2">{permiso.fecha_creacion}</div>
                    {permiso.estado == 0 ? (
                        <div className="flex flex-col justify-center items-center p-2">
                            <div className="text-yellow-800">
                                PENDIENTE
                            </div>
                            <div>
                                <button className="text-xl" onClick={() => { manejarValidacion(1, permiso.id) }}>✅</button>
                                <button className="text-xl" onClick={() => { manejarValidacion(2, permiso.id) }}>❌</button>
                            </div>
                        </div>
                    ) : permiso.estado == 1 ? (
                        <div className="text-green-700 flex justify-center items-center">VALIDADO</div>
                    ) : permiso.estado == 2 ? (
                        <div className="text-red-700 flex justify-center items-center">ANULADO</div>
                    ) : null
                    }
                    <div className="p-2"><PdfPermiso permiso={permiso} /></div>
                </div>
            ))}
        </div>
    )
}

export default Permisos;