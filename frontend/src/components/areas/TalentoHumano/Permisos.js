import React, { useEffect, useState } from "react";
import axios from "axios";

const Permisos = () => {

    const [permisos, setPermisos] = useState([]);

    useEffect(() => {
        const obtenerPermisos = async () => {
            const respuesta = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/talento-humano/permisos`);
            setPermisos(respuesta.data);
        }

        obtenerPermisos();
    }, [])

    const manejarValidacion = () => {
        
    }

    return (
        <div className="text-xs border">
            <div className="grid grid-cols-12 font-semibold p-2 border">
                <div>Numero</div>
                <div>Empleado</div>
                <div>Tipo</div>
                <div>Día del permiso</div>
                <div>Hora de salida</div>
                <div>Hora de ingreso</div>
                <div>Total de horas</div>
                <div>Fecha de salida</div>
                <div>Fecha de ingreso</div>
                <div>Total de días</div>
                <div>Fecha de creación</div>
                <div>Estado</div>
            </div>

            {permisos && (permisos.map(permiso =>
                <div
                    className="grid grid-cols-12 p-2 border"
                    key={permiso.id}
                
                >
                    <div>{permiso.id}</div>
                    <div className="text-wrap">{permiso.empleado}</div>
                    <div>{permiso.tipo}</div>
                    <div>{permiso.dia_permiso}</div>
                    <div>{permiso.hora_salida}</div>
                    <div>{permiso.hora_ingreso}</div>
                    <div>{permiso.total_horas}</div>
                    <div>{permiso.fecha_salida}</div>
                    <div>{permiso.fecha_ingreso}</div>
                    <div>{permiso.total_dias}</div>
                    <div>{permiso.fecha_creacion}</div>
                    {permiso.estado == 0 ? (
                        <div className="items-start flex flex-col gap-2">
                            <button onClick={ ()=>{manejarValidacion(1)} }>VALIDAR</button>
                            <button onClick={ ()=>{manejarValidacion(2)} }>ANULAR</button>
                        </div>
                        ) : permiso.estado == 1 ? (
                            <div>VALIDADO</div>
                        ) : permiso.estado == 2 ? (
                            <div>ANULADO</div>
                        ) : null
                    }
                </div>
            ))}
        </div>
    )
}

export default Permisos;