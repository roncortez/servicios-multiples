import React, { useState } from "react";
import axios from "axios";
import '../styles/Reportes.css'

const Reportes = () => {

    const [startDate, setstartDate] = useState(null);
    const [endDate, setendDate] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState([]);

    const sendDates = async (e) => {
        e.preventDefault();

        try {

            const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reporte`, {
                startDate: startDate,
                endDate: endDate
            })
            setData(result.data);
            setSuccess(true);
        } catch (error) {
            console.log('Error al enviar fechas:', error);
            setError(error);
        }
    }

    return (
        <div>
            <form className='reportes__form' onSubmit={sendDates}>
                <p>Seleccione las fechas:</p>
                <label>Desde:</label>
                <input
                    onChange={(e) => { setstartDate(e.target.value) }}
                    type='date'
                />
                <label>Hasta:</label>
                <input
                    type='date'
                    onChange={(e) => { setendDate(e.target.value) }}
                />
                <button>Descargar</button>
            </form>
            {error && <p>{error.message}</p>}
            {/* Muestra los data si están disponibles */}
            {data.length > 0 &&
                <div>
                    <h3>Reporte</h3>
                    <ul>
                        {data.map((item, index) => (
                            <li key={index}>
                                <div>
                                    <strong>Nombres:</strong> {item.nombres}
                                </div>
                                <div>
                                    <strong>Fecha:</strong> {item.fecha}
                                </div>
                                <div>
                                    <strong>Hora:</strong> {item.hora}
                                </div>
                                <div>
                                    <strong>Invitados:</strong> {item.invitados}
                                </div>
                                <hr />
                            </li>
                        ))}
                    </ul>
                </div>
            }
            {(data.length === 0) && success && (<p>No se encontraron datos</p>)}
        </div>
    )
}

export default Reportes;