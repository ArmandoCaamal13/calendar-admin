import React from 'react'
import {Route,Navigate } from 'react-router-dom'
import { useSelector  } from 'react-redux'

const PrivateRoute = ({ isAuthenticated = false, children }) => {
    const data = useSelector(state=> state.login_data)
    const isAutut = data.token === null ? true : true;
    return isAutut? children : <Navigate to="/login" />;
};

export default PrivateRoute