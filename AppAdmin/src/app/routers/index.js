import  React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import AdminTemplate from '../containers/template';
import DomainsFile from '../pages/domains_file';
import TemplateLogin from '../pages/login';
import Schedules from '../pages/schedules';
import Home from '../pages/home'
import PrivateRoute  from 'components/PrivateRoute'
import PageSchedule from '../pages/schedule/index';

const App = () => {
    return (
        <BrowserRouter>
            <AdminTemplate>
                <Routes>
                    <Route  path = "/" element = {
                            <PrivateRoute>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    <Home />
                                </div>
                            </PrivateRoute>
                        } 
                    />
                    <Route path='/create-file' element= { 
                            <PrivateRoute>
                                <DomainsFile />
                            </PrivateRoute> 
                        } 
                    />
                    <Route path='/create-schedule' element= {
                            <PrivateRoute>
                                <Schedules />
                            </PrivateRoute> 
                        } 
                    />
                    <Route path='/refactorizacion-create-schedule' element= {
                            <PrivateRoute>
                                <PageSchedule />
                            </PrivateRoute> 
                        } 
                    />
                    <Route path='/login' element= {<TemplateLogin />} />
                </Routes>
            </AdminTemplate>
        </BrowserRouter>
    )
}

export default App