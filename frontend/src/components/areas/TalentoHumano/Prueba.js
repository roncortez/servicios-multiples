import React, { useState } from "react";

const Prueba = () => {

    const [cantidad, setCantidad] = useState(0);

    const manejarClick = () => {
        alert("Diste click")
        setCantidad(2);
    }

    return (
        <div className="flex gap-2 bg-gray-200">
            <h1>Hola</h1>
            <p>Hola</p>
            <button onClick={manejarClick}>Dale click</button>
            <p>{cantidad}</p>
            {cantidad == 0 ? 
            <div>Chao</div>
            :<div>Hola</div>}
        </div>
    )
}

export default Prueba;