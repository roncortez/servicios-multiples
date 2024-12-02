import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { menuConfig } from '../config/menuConfig';
import '../../styles/Sidebar.css';

function Sidebar({ userRole }) {
    const userMenu = menuConfig[userRole] || { displayName: 'Menú', items: [] };

    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (menuName) => {
        setOpenMenu(openMenu === menuName ? null : menuName);
    };

    return (
        <div className='sidebar'>
            <div className="sidebar-header">
                <h2>{userMenu.displayName}</h2>
            </div>
            <ul className="menu-list">
                {userMenu.items.map((item, index) => (
                    <li key={index} className="menu-item">
                        <Link to={item.path}>{item.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
