import React from 'react';
import { Link } from 'react-router-dom';

function Navbar () {

    return (
        <nav>
            <div>
                <Link to='/servicios-multiples'>Servicios Múltiples</Link>
                <Link to='/empleados'>Talento Humano</Link>
            </div>
        </nav>
    )
}

export default Navbar;