import axios from "axios";
import React, { useEffect, useState } from "react";

function Permisos() {
    const [tipoPermiso, setTipoPermiso] = useState(null);
    const [tiempoPermiso, setTiempoPermiso] = useState(null);
    const [horaSalida, setHoraSalida] = useState("");
    const [horaIngreso, setHoraIngreso] = useState("");
    const [busqueda, setBusqueda] = useState("");
    const [mostrarLista, setMostrarLista] = useState(false);
    const [empleados, setEmpleados] = useState([]);
    const [totalHoras, setTotalHoras] = useState(null);
    const [totalDias, setTotalDias] = useState(null);

    useEffect(() => {
        const fetchEmpleados = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/talento-humano/empleados`
                );
                setEmpleados(response.data);
            } catch (error) {
                console.error("Error al obtener empleados:", error);
            }
        };
        fetchEmpleados();
    }, []);

    useEffect(() => {
        if (horaSalida && horaIngreso) {
            const salida = new Date(`1970-01-01T${horaSalida}:00`);
            const ingreso = new Date(`1970-01-01T${horaIngreso}:00`);
            const diferenciaMs = ingreso - salida;

            const horas = (diferenciaMs / (1000 * 60 * 60)).toFixed(2);
            setTotalHoras(horas);
        }
    }, [horaSalida, horaIngreso]);

    const resetEstados = () => {
        setHoraSalida("");
        setHoraIngreso("");
        setTotalHoras(null);
    };

    const handleTiempoPermisoChange = (value) => {
        setTiempoPermiso(value);
        resetEstados();
    };

    const empleadosFiltrados = empleados.filter((empleado) =>
        empleado.Nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("¿Está seguro de que desea guardar?");
    };

    const handleSeleccionEmpleado = (nombre) => {
        setBusqueda(nombre);
        setMostrarLista(false);
    };

    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
        setMostrarLista(true);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-lg rounded-xl max-w-xl w-full h-[600px] overflow-y-auto">
                <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">Crear Permiso</h1>
                <form onSubmit={handleSubmit}>
                    {/* Campo de Búsqueda */}
                    <div className="relative mb-6">
                        <label className="block text-lg font-medium text-gray-600 mb-2">
                            Empleado
                        </label>
                        <input
                            type="text"
                            value={busqueda}
                            onChange={handleBusquedaChange}
                            onFocus={() => setMostrarLista(true)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Buscar empleado por nombre..."
                        />
                        {mostrarLista && busqueda && (
                            <ul className="absolute bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto mt-1 w-full z-10">
                                {empleadosFiltrados.length > 0 ? (
                                    empleadosFiltrados.map((empleado) => (
                                        <li
                                            key={empleado.idPersonal}
                                            onClick={() =>
                                                handleSeleccionEmpleado(empleado.Nombre)
                                            }
                                            className="cursor-pointer hover:bg-blue-100 px-4 py-2 text-gray-700"
                                        >
                                            {empleado.Nombre}
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-4 py-2 text-gray-500">
                                        No se encontraron empleados
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>

                    {/* Tipo de Permiso */}
                    <div className="mb-6">
                        <h2 className="text-lg font-medium text-gray-600 mb-2">Tipo de Permiso</h2>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="personal"
                                    name="tipoPermiso"
                                    onChange={(e) => setTipoPermiso(e.target.value)}
                                    className="accent-blue-500"
                                />
                                <span>Personal</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="medico"
                                    name="tipoPermiso"
                                    onChange={(e) => setTipoPermiso(e.target.value)}
                                    className="accent-blue-500"
                                />
                                <span>Médico</span>
                            </label>
                        </div>
                        {tipoPermiso === "medico" && (
                            <p className="text-sm text-red-500 mt-2">
                                * Es necesario un certificado médico.
                            </p>
                        )}
                    </div>

                    {/* Duración del Permiso */}
                    <div className="mb-6">
                        <h2 className="text-lg font-medium text-gray-600 mb-2">Duración</h2>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="tiempoPermiso"
                                    value="horas"
                                    onChange={(e) => handleTiempoPermisoChange(e.target.value)}
                                />
                                <span>Por horas</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="tiempoPermiso"
                                    value="dias"
                                    onChange={(e) => handleTiempoPermisoChange(e.target.value)}
                                />
                                <span>Por días</span>
                            </label>
                        </div>

                        {/* Horas */}
                        {tiempoPermiso === "horas" && (
                            <div className="flex flex-col mt-4 gap-4">
                                <div className="flex gap-4">
                                    <label className="flex flex-col">
                                        Fecha
                                        <input
                                            type="date"
                                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                    </label>
                                </div>
                                <div className="flex gap-4">
                                    <label className="flex flex-col">
                                        Hora de Salida
                                        <input
                                            type="time"
                                            value={horaSalida}
                                            onChange={(e) => setHoraSalida(e.target.value)}
                                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-36"  
                                        />
                                    </label>
                                    <label className="flex flex-col">
                                        Hora de Ingreso
                                        <input
                                            type="time"
                                            value={horaIngreso}
                                            onChange={(e) => setHoraIngreso(e.target.value)}
                                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-36"  
                                        />
                                    </label>
                                </div>
                                {totalHoras && (
                                    <p className="text-gray-600">
                                        Total de horas: <strong>{totalHoras}</strong>
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Días */}
                        {tiempoPermiso === "dias" && (
                            <div className="flex flex-col mt-4 gap-4">
                                <label className="flex flex-col">
                                    Desde
                                    <input
                                        type="date"
                                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </label>
                                <label className="flex flex-col">
                                    Hasta
                                    <input
                                        type="date"
                                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Botón Guardar */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Permisos;
