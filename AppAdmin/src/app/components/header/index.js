import React, { useState } from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import Logo from './logo/index';
import Hamburger from './icon/index';
import './style_navbar.scss';

const MenuNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const navigate = useNavigate();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleLogout = async () => {
    AuthService.logout();
    navigate('/login')
  };

  const user = AuthService.getCurrentUser();

  return (
    <>
      <nav className="navbar">
        <div className='container__navbar'>
          <div className='logo'>
            <Logo />
          </div>
          <div className='menu-icon' onClick={handleShowNavbar}>
            <Hamburger />
          </div>
          <div className={`nav-elements ${showNavbar && "active"}`}>
            <ul>
             
              {user ? (
                <li><button className='btn btn-primary' onClick={handleLogout}>Logout</button></li>
              ) :  
                <li><NavLink to="/login">Login</NavLink></li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default MenuNavbar;
