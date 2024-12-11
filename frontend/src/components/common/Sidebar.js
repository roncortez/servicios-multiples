import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { roleRoutes } from '../config/roleRoutes';
import AuthContext from '../../context/AuthContext';
import '../../styles/common/Sidebar.css'

function Sidebar() {

    const { user, logout } = useContext(AuthContext);
    const userRoutes = roleRoutes[user.role];
    console.log('User: ', user);

    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <h3 className='sidebar__welcome'>Bienvenido {user.user}</h3>
                <h2 className='sidebar__role'>{userRoutes.displayName}</h2>
                <div className='sidebar__links'>
                    {userRoutes.routes.map((route) =>
                        <Link
                            className='sidebar__link'
                            to={route.path}
                            key={route.path}
                        >
                            {route.label}
                        </Link>
                    )}
                </div>
            </div>

        </div>
    );
}

export default Sidebar;
