import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/areas/Admin/Dashboard';
import ProtectedRoute from '../components/common/ProtectedRoute';


const AdminRoutes = ({ userRole }) => (
    <Routes>
        <Route
            path="dashboard"
            element={
                <ProtectedRoute userRole={userRole} allowedRole={1}>
                    <Dashboard />
                </ProtectedRoute>
            }
        />
    </Routes>

);

export default AdminRoutes;