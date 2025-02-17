import React, { useEffect, useState } from "react";
import axios from "axios";

const Solicitudes = () => {

    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        const obtenerPermisos = async () => {
            const respuesta = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/talento-humano/permisos`);
            setSolicitudes(respuesta.data);
        }

        obtenerPermisos();
    }, [])

    return (
        <div className="text-xs border">
            <div className="grid grid-cols-11 font-semibold p-2 border">
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
            </div>

            {solicitudes && (solicitudes.map(solicitud =>
                <div
                    className="grid grid-cols-11 truncate p-2 border"
                    key={solicitud.id}
                
                >
                    <div>{solicitud.id}</div>
                    <div className="text-wrap">{solicitud.empleado}</div>
                    <div>{solicitud.tipo}</div>
                    <div>{solicitud.dia_permiso}</div>
                    <div>{solicitud.hora_salida}</div>
                    <div>{solicitud.hora_ingreso}</div>
                    <div>{solicitud.total_horas}</div>
                    <div>{solicitud.fecha_salida}</div>
                    <div>{solicitud.fecha_ingreso}</div>
                    <div>{solicitud.total_dias}</div>
                    <div>{solicitud.fecha_creacion}</div>
                </div>
            )

            )}
        </div>
    )
}

export default Solicitudes;