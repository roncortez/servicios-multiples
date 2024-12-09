import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Sidebar.css';
import { roleRoutes } from '../config/roleRoutes';


function Sidebar({ userRole }) {
    //const userMenu = roleRoutes.roleId[userRole] || { displayName: 'Menú', items: [] };

    const userRoutes = roleRoutes[userRole];

    return (
        <div className='sidebar'>
            <div className="sidebar-header">
                <h2>{userRoutes.displayName}</h2>
                {userRoutes.routes.map((route) => 
                    <Link 
                        to={route.path} 
                        key={route.path}
                    >
                        {route.label}
                    </Link>
                )}
            </div>

        </div>
    );
}

export default Sidebar;
