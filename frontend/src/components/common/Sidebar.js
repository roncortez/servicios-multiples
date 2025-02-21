import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { roleRoutes } from '../config/roleRoutes';
import AuthContext from '../../context/AuthContext';

const Sidebar = () => {

    const { user, logout } = useContext(AuthContext);
    const userRoutes = roleRoutes[user.role];
    console.log('User: ', user);

    return (
        <div className='sidebar'>
            <div className="flex flex-col mx-4 mt-4">
                <h3 className='text-xl font-bold'>Bienvenido</h3>
                <h2 className='text-lg mt-2'>{userRoutes.displayName}</h2>
                <ul className='space-y-6 lg:space-y-3 border-l border-slate-100 mt-4'>
                    {userRoutes.routes.map((route) =>
                        <NavLink
                            className={({ isActive}) => 
                                isActive 
                                    ? 'block border-l pl-4 -ml-px text-blue-900 border-current font-semibold' 
                                    : 'block border-l pl-4 -ml-px border-transparent hover:border-slate-400 hover:text-slate-900'} 
                            to={route.path}
                            key={route.path}
                        >
                            {route.label}
                        </NavLink>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
