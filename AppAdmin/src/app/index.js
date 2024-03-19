import React, { useEffect } from 'react';
import RouteApp from './routers/index';
import Sidebar from 'components/menu/index';
import MenuNavbar from 'components/header/index';
import {useLocation, useNavigate } from 'react-router-dom';
import authService from './services/auth.service';
import classNames from 'classnames';
import './style.scss'

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // Verifica si la ruta actual es "/login"
    const isLoginPage = location.pathname === "/login";

    useEffect(() => {
        // Verifica si el usuario esta autenticado
        const isAuthenticated = authService.getCurrentUser();
        if (!isLoginPage && !isAuthenticated) {
            navigate("/login");
        }
    }, [isLoginPage, navigate]);

    return (
        <>
            <div className='bg-neutral-100 h-screen w-screen overflow-hidden'>
                {!isLoginPage && <Sidebar />}
                <div className={classNames('flex-1 h-100', '')}>
                    {!isLoginPage  && <MenuNavbar />}
                    <div className='p-0'><RouteApp /></div>
                </div>
            </div>
        </>
    )
}

export default App