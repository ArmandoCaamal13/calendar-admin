import React, { useState } from 'react'
import './style_sidebar.scss'
import { NavLink } from 'react-router-dom';
import MenuNavbar from 'components/header/index';
import Home from '../../pages/home/index';

const Menu = () => {
    return (
        <>
            <div className="sidebar">
                <header className='menu-title'>Calendar</header>
                <div className="link">
                    <NavLink to="/">
                        <i className="fas fa-qrcode"></i>
                        <span className='name'>Dashboard</span>
                    </NavLink>
                </div>
                <div className="link">
                    <NavLink to="/create-file">
                        <i className="fas fa-stream"></i>
                        <span className='name'>Meta tags</span>
                    </NavLink>
                </div>
                <div className="link">
                    <NavLink to="/create-schedule">
                        <i className="fas fa-calendar"></i>
                        <span className='name'>Fechas</span>
                    </NavLink>
                </div>
            </div>
            
        </>
    )
}

export default Menu