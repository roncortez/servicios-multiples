import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { menuConfig } from '../config/menuConfig';
import '../../styles/Sidebar.css'

function Sidebar( {userRole} ) {

    const userMenu = menuConfig[userRole] || [];

    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (menuName) => {
        setOpenMenu(openMenu === menuName ? null : menuName);
    };


    return (
        <div className='sidebar'>
            <div>
                <h2>{userRole}</h2>
            </div>
            {userMenu.map((item, index) => (
                <Link key={index} to={item.path}>
                    {item.label}
                </Link>
            ))}
        </div>
    )
}

export default Sidebar;