import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from 'xlsx';


const Reportes = () => {

    const [categories, setCategories] = useState(['Asistencia']);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [downloading, setDownloading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        console.log("Hola");
    }, []);

    const formatDate = (date) => {
        const [year, month, day] = date.split('-');
        const formattedDate = `${year}${month}${day}`
        return formattedDate;
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        setSuccess(false);
        setDownloading(true);

        try {
            const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/talento-humano/report`,
                {
                    startDate: formatDate(startDate),
                    endDate: formatDate(endDate)
                }
            );
            const reportList = result.data;
            if (reportList.length > 0) {
                exportToExcel(reportList, 'reporte.xlsx');
                setSuccess(true);
            } else {
                alert("No se encontraron datos para exportar");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setDownloading(false);
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


    return (
        <div className="flex items-center justify-center">
        <div className="p-6 rounded-lg w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-4">
            Reportes
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Tipo
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Desde
              </label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Hasta
              </label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={!selectedCategory || !startDate || !endDate || downloading}
              className={`w-full py-2 px-4 text-white rounded-md ${
                downloading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-900 hover:bg-blue-600"
              }`}
            >
            {downloading ? "Procesando..." : "Descargar"}
            </button>
          </form>
          {success && (
            <p className="text-green-600 text-medium mt-4 text-center">
              ¡Reporte descargado exitosamente!
            </p>
          )}
        </div>
      </div>
    );
}

export default Reportes;