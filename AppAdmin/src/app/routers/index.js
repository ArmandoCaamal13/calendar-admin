import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import DomainsFile from '../pages/domains_file';
import Schedules from '../pages/schedules';
import Home from '../pages/home';
import PageSchedule from '../pages/schedule/index';
import Menu from 'components/menu/index';
import Header from 'components/header/index';
import './style_routers.scss'
import LoginComponent from '../pages/login.component';
import TemplateLogin from '../pages/login/index';
import AuthService from '../services/auth.service';
import PrivateRoute from 'components/PrivateRoute/index';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Verifica si la ruta actual es "/login"
  const isLoginPage = location.pathname === "/login";
  

  useEffect(() => {
    // Verifica si el usuario esta autenticado
  const isAuthenticated = AuthService.getCurrentUser();
    if (!isLoginPage && !isAuthenticated) {
      navigate("/login");
    }
  })

  return (
    <>
      {!isLoginPage && <Header />}
      <div className='main-layout'>
      {!isLoginPage && <Menu />}
        <Routes>
          <Route path="/login" element={<div className='main__login'><TemplateLogin /></div>} />
          <Route path="/" element={<Home />} />
          <Route path="/create-file" element={<DomainsFile />} />
          <Route path="/create-schedule" element={<Schedules />} />
          <Route path="/refactorizacion-create-schedule" element={<PageSchedule />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
