import React from "react";
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "../components/common/ProtectedRoute";
import Solicitud from "../components/common/Solicitud";


const GeneralRoutes = ({ userRole }) => (
    <Routes>
        <Route
            path="permiso"
            element={
                <ProtectedRoute userRole={userRole} allowedRole={4}>
                    <Solicitud />
                </ProtectedRoute>
            }
        >
        </Route>
    </Routes>
)




export default GeneralRoutes;