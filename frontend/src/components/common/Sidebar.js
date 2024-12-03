import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Sidebar.css';

function Sidebar({ userRole }) {
    //const userMenu = roleRoutes.roleId[userRole] || { displayName: 'Menú', items: [] };

    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (menuName) => {
        setOpenMenu(openMenu === menuName ? null : menuName);
    };

    return (
        <div className='sidebar'>
            <div className="sidebar-header">
                <h2>h</h2>
            </div>

        </div>
    );
}

export default Sidebar;
