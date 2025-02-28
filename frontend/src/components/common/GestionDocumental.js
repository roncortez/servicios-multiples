import React, { useEffect, useState } from "react";
import axios from "axios";

const GestionDocumental = () => {

    const [tiposDocumento, setTiposDocumento] = useState([]);
    const [destinatarios, setDestinatarios] = useState([]);
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [destinatario, setDestinatario] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [fechaDocumento, setFechaDocumento] = useState('');
    const [anioDocumento, setAnioDocumento] = useState('');
    const [dependencia, setDependencia] = useState('GG');

    useEffect(() => {
    
        const obtenerDatos = async () => {
            const [tiposDocumentoData, destinatariosData] = await Promise.all([ 
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/gestion/tipos-documento`),
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/gestion/destinatarios`)
            ]); 
            setTiposDocumento(tiposDocumentoData.data);
            setDestinatarios(destinatariosData.data);
        }
        obtenerDatos();
    }, [])

    const generarNumero = async (e) => {
        e.preventDefault();
        try {
            
            const anio = new Date(fechaDocumento).getFullYear(); // Calcula el año directamente
            setAnioDocumento(anio); // Guarda el año en el estado
    
            const numeroGenerado = `${tipoDocumento} N° ${anio}-12345-CM-${dependencia}`; // Usa el año directamente
            setNumeroDocumento(numeroGenerado); // Guarda el número completo
            alert("Numero generado");
            //const respuesta = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/gestion/generar-numero`);
            //setNumeroDocumento(respuesta.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="p-2">
            <h1 className="font-semibold text-2xl">Gestión Documental</h1>
            <h2 className="font-semibold text-xl">Generar número de documento</h2>
            <form onSubmit={generarNumero} className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <label>Tipo de documento</label>
                    <select onChange={(e) => setTipoDocumento(e.target.value)} value={tipoDocumento}>
                        <option value="">Seleccione un tipo de documento</option>
                        {tiposDocumento && tiposDocumento.map(tipoDocumento => (
                            <option 
                                key={tipoDocumento.id}
                                value={tipoDocumento.nombre}
                            >
                                {tipoDocumento.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Fecha</label>
                    <input 
                        type="date"
                        value={fechaDocumento}
                        onChange={e => setFechaDocumento(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label>Asunto</label>
                    <textarea></textarea>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Destinatario</label>
                    <select onChange={(e) => setDestinatario(e.target.value)} value={destinatario}>
                        <option value="">Seleccione un destinatario</option>
                        {destinatarios && destinatarios.map((destinatario) => (
                            <option
                                value={destinatario.nombre}
                                key={destinatario.id}
                            >
                                {destinatario.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Generar</button>
            </form>
            {numeroDocumento && <p>El número de documento generado es: <span className="font-semibold">{numeroDocumento}</span></p>}
        </div>
    );
}

export default GestionDocumental;