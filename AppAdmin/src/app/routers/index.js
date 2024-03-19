import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import DomainsFile from '../pages/domains_file';
import Schedules from '../pages/schedules';
import Home from '../pages/home';
import PageSchedule from '../pages/schedule/index';
import Menu from 'components/menu/index';
import Header from 'components/header/index';
import './style_routers.scss'
import TemplateLogin from '../pages/login/index';
import AuthService from '../services/auth.service';
import classNames from 'classnames';
const RouteApp = () => {

  return (
    <>
        <Routes>
          <Route path="/login" element={<div className='main__login'><TemplateLogin /></div>} />
          <Route path="/" element={<div className={classNames('flex-1 h-100', 'container_main')}><Home /></div>} />
          <Route path="/create-file" element={<div className={classNames('flex-1 h-100', 'container_main')}><DomainsFile /></div>} />
          <Route path="/create-schedule" element={<div className={classNames('flex-1 h-100', 'container_main')}><Schedules /></div>} />
          <Route path="/refactorizacion-create-schedule" element={<div className={classNames('flex-1 h-100', 'container_main')}><PageSchedule /></div>} />
        </Routes>
    </>
  );
};

export default RouteApp;
