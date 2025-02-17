import React from "react";
import { Routes, Route } from "react-router-dom"
import '../components/areas/TalentoHumano/Permisos'
import ProtectedRoute from "../components/common/ProtectedRoute";

const GeneralRoutes = ({ userRole }) => {
    <Routes>
        <Route
            path="permisos"
            element={
                <ProtectedRoute userRole={userRole} allowedRole={4}>
                    <Permisos />
                </ProtectedRoute>
            }
        >
        </Route>
    </Routes>
}




export default GeneralRoutes;