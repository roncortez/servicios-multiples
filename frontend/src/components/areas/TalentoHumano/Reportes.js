import React, { useState } from "react";
import axios from "axios";

const Reportes = () => {

    const [categories, setCategories] = useState(['Asistencia', 'Vacaciones']);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    }

    const handleSubmit = async (e) => {
        console.log('Botón presionado');
        e.preventDefault();
        const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/talento-humano/reportes`,
            {
                startDate: startDate,
                endDate: endDate
            }
        );

        const resultData = result.data;

    }

    return (
        <div>
            <div>
                <h3>Elija el tipo de reporte:</h3>
                <select value={selectedCategory} onChange={handleChange}>
                    <option value='' disabled>
                        Selecciona una opción
                    </option>
                    {categories.map((category, index) =>
                        <option key={index} value={category}>
                            {category}
                        </option>
                    )}
                </select>
                {selectedCategory && (
                    <form onSubmit={handleSubmit}>
                        <label>Desde</label>
                        <input
                            type='date'

                        />
                        <label>Hasta</label>
                        <input
                            type='date'

                        />
                        <button>Descargar</button>
                    </form>
                )}

            </div>



        </div>
    )
}

export default Reportes;