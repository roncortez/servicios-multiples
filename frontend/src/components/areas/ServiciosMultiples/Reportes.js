import React, { useState } from "react";
import * as XLSX from 'xlsx';
import axios from "axios";
import '../../../styles/Reportes.css'

const Reportes = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const generateData = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {

            const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reporte`, {
                startDate: startDate,
                endDate: endDate
            });

            // No se usa el estado data ya que se ejecuta de forma asíncrona
            const resultData = result.data;

            if (resultData.length > 0) {
                exportToExcel(resultData, 'report.xlsx');
                setSuccess(true);
            } else {
                alert("No se encontraron datos para exportar");
            }
        } catch (error) {
            console.log('Error al enviar fechas:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEndDateChange = (date) => {
        
        if (startDate && (new Date(date) < new Date(startDate))){
            alert('La fecha posterior debe ser mayor o igual a la fecha inicial');
            setEndDate('');
        } else {
            setEndDate(date);
        }
    }

    const exportToExcel = (data, fileName = 'report.xlsx') => {
        if (!data || data.length === 0) {
            console.error("No hay datos para exportar");
            return;
        }
        
        // Crea la hoja de trabajo desde el array de objetos
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Crea un nuevo libro de trabajo
        const workbook = XLSX.utils.book_new();

        // Añade la hoja de trabajo al libro de trabajo
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');

        // Genera el archivo
        XLSX.writeFile(workbook, fileName);
    };

    const deleteData = (e) => {
        e.preventDefault();
        setStartDate(null);
        setEndDate(null);
        setError(null);
        setSuccess(false);
        setLoading(false);
    };

    return (
        <div className='report-container'>
            <form className='report__form' onSubmit={generateData}>
                <h2>Seleccione las fechas:</h2>
                <label className='report__label'>Desde:</label>
                <input
                    className='report__input'
                    value={startDate || ''}
                    type='date'
                    onChange={(e) => { setStartDate(e.target.value) }}
                />
                <label className='report__label'>Hasta:</label>
                <input
                    className='report__input'
                    value={endDate || ''}
                    type='date'
                    onChange={(e) => { handleEndDateChange(e.target.value) }}
                />
                <button
                    className='report__button report__button--submit'
                    disabled={!startDate || !endDate}
                >
                    Descargar reporte
                </button>
                <button
                    className='report__button report__button--delete'
                    onClick={deleteData}
                >
                    Limpiar
                </button>
            </form>

            {error && <p>{error}</p>}
            {loading && <p>Cargando...</p>}

        </div>
    );
};

export default Reportes;
