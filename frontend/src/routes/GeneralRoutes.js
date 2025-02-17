import React from "react";
import { Routes, Route } from "react-router-dom"
import Permiso from '../components/common/Permiso';
import ProtectedRoute from "../components/common/ProtectedRoute";


const GeneralRoutes = ({ userRole }) => (
    <Routes>
        <Route
            path="permisos"
            element={
                <ProtectedRoute userRole={userRole} allowedRole={4}>
                    <Permiso />
                </ProtectedRoute>
            }
        >
        </Route>
    </Routes>
)




export default GeneralRoutes;