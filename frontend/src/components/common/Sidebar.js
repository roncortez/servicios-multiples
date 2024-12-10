import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Sidebar.css';
import { roleRoutes } from '../config/roleRoutes';
import AuthContext from '../../context/AuthContext';


function Sidebar() {

    const { user, logout } = useContext(AuthContext);
    const userRoutes = roleRoutes[user.role];
    console.log('User: ', user);

    return (
        <div className='sidebar'>
            <div className="sidebar-header">
                <h2>{userRoutes.displayName}</h2>
                <h3>Bienvenido {user.user}</h3>
                <button onClick={logout}>Cerrar sesión</button>
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
