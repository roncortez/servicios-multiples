import React, { useContext } from 'react';
import logo from '../../assets/logo.png'
import '../../styles/common/Header.css'
import AuthContext from '../../context/AuthContext';

const Header = () => {

    const { logout } = useContext(AuthContext); 

    return (
        <nav className='header'>
            <div className='header__logo-section'>
                <img className='header__logo-img' src={logo} />
                { /* <img className='header__logo' /> */}
                <div className='header__branding'>
                    <h2 className='header__title'>Círculo Militar</h2>
                    <span className='header__subtitle'>¡Mucho más que un buen club!</span>
                </div>
            </div>
            <button 
                className='header__logout-button'
                onClick={logout}
            >
                Cerrar sesión
            </button>
        </nav>
    )
}

export default Header;