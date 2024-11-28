import React from "react";
import Navbar from "../common/Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout () {

    return (
        <div>
            <h1>Sistema de gestión - Círculo Militar</h1>
            <Navbar />
              {/* Contenedor dinámico para rutas */}
              <main style={{ padding: "20px" }}>
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout