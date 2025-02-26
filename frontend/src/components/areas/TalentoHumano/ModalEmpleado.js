import React, { useState } from "react";
import axios from "axios";

const ModalEmpleado = ({ isOpen, onClose }) => {

    const [cedula, setCedula] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [telefono, setTelefono] = useState("");
    const [celular, setCelular] = useState("");
    const [direccion, setDireccion] = useState("");

    const crearEmpleado = async (event) => {
        event.preventDefault(); // Evita el envío automático del formulario
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/talento-humano/empleado`, {
                cedula: cedula,
                nombres: nombres,
                apellido: apellidos,
                telefono: telefono,
                celular: celular,
                direccion: direccion
            });
            alert("Empleado registrado")
        } catch (error) {
            console.log(error);
        }        
    }

    if (!isOpen) return null;

    return (
        <div className="absolute left-0 top-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col gap-2 bg-white p-8 shadow-lg rounded-xl w-1/2 text-sm">
                {/* Encabezado */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Nuevo empleado</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                {/* Formulario */}
                <form onSubmit={crearEmpleado} className="grid w-full">
                    <div className="flex flex-col">
                        <label className="font-semibold">Cédula</label>
                        <input
                            className="border p-1 rounded mb-2"
                            type="text"
                            value={cedula}
                            maxLength="10"
                            minLength="10"
                            onChange={ (e) => setCedula(e.target.value) }
                        />
                    </div>   
                    <div className="flex flex-col">
                        <label className="font-semibold">Nombres</label>
                        { /* En input controlado usando el atributo value={nombres} significa que el valor del input
                        está vinculado al estado (nombres)*/}
                        <input
                            className="border p-1 rounded mb-2"
                            type="text"
                            value={nombres}
                            onChange={ (e) => setNombres(e.target.value.toUpperCase()) }
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">Apellidos</label>
                        <input 
                            className="border p-1 rounded mb-2" 
                            type="text"
                            value={apellidos}
                            onChange={ (e) => setApellidos(e.target.value.toUpperCase()) }
                        />
                    </div>
                    <div className="flex gap-2">
                        <div className="flex flex-col">
                            <label className="font-semibold">Teléfono</label>
                            <input 
                                className="border p-1 rounded mb-2" 
                                type="text"  
                                value={telefono} 
                                maxLength="10"
                                minLength="10"
                                onChange={ (e) => setTelefono(e.target.value.toUpperCase()) }
                            />
                        </div>
                        
                        <div className="flex flex-col">
                            <label className="font-semibold">Celular</label>
                            <input 
                                className="border p-1 rounded mb-2" 
                                type="text"  
                                value={celular} 
                                maxLength="10"
                                minLength="10"
                                onChange={ (e) => setCelular(e.target.value) }
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold">Dirección</label>
                        <input 
                            className="border p-1 rounded mb-2" 
                            type="text"
                            value={direccion}                      
                            onChange={ (e) => setDireccion(e.target.value.toUpperCase()) }    
                        />
                    </div>

                    <button 
                        type="submit"
                        className="p-2 rounded-lg bg-blue-900 text-white hover:bg-blue-600"
                    >
                        Guardar
                    </button>
                </form>

            </div>
        </div>
    );
};

export default ModalEmpleado;


