import React, { useState } from "react";
import axios from "axios";
import '../styles/Reportes.css'

const Reportes = () => {

    const [startDate, setstartDate] = useState(null);
    const [endDate, setendDate] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const sendDates = async (e) => {
        e.preventDefault();
        
        try {
            const result = await axios.post(`${process.env.REACT_BACKEND_URL}/api/reporte`, {
                fechaInicio: startDate,
                fechaFinal: endDate
            },{ reponseType: 'blob' }
            ); 

            const url = window.URL.createObjectURL(new Blob([result.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'reporte.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();

            setSuccess(true);
        } catch(error) {
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
                    onChange={(e) => {setstartDate(e.target.value)}}
                    type='date'
                />
                <label>Hasta:</label>
                <input
                    type='date'
                    onChange={(e) => {setendDate(e.target.value)}}
                />
                <button>Descargar</button>
            </form>
            <p>{startDate}</p>
            <p>{endDate}</p>
            {error && <p>{error}</p>}
            {success && <p>Descarga exitosa</p>}
        </div>
    )
}

export default Reportes;