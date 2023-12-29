import React, { useState } from 'react';
import './loginEstruct.scss';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { GET_LOGIN } from 'api/login';
import { set_login } from 'storage/login/action';
import { Input } from 'antd';

const TemplateLogin = () => {
  const setLogin = useSelector((state) => state.setLogin);
  const dispatch = useDispatch();
  const [validate, setValidate] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [form, setForm] = useState({
    password: '',
    username: '',
    role: 1
  });

  const [authError, setAuthError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSumbit = async () => {
    const response = await GET_LOGIN(form);
    if (response) {
      dispatch(set_login(response));
      setValidate(true);
    }else{
      setAuthError('Credenciales incorrectas');
      console.error('Credenciales incorrectas');
    }
  };

  const toggleShowPassword = (e) => {
    setShowPassword(e.target.checked);
  };

  const [passwordVisible, setPasswordVisible] = React.useState(false);


  return (
    <>
      {validate && <Navigate to="/create-file" />}
      <div className="container-login">
        <div className="login-box card">
          <div className="box">
            <h3 className="box__title">INICIAR SESION</h3>
            <div className="box__form">
              <label className="box__label" htmlFor="usuarioID">
                Usuario
              </label>
              <div className="box__group box--borderActive box__group--text">

                <input
                  className="box__input"
                  id="username"
                  type="text"
                  placeholder="example113"
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <label className="box__label" htmlFor="passwordID">
                Contraseña
              </label>
              <div className="box__group box--borderActive box__group--text">

                {/* <input
                  className="box__input"
                  id="passwordID"
                  type={showPassword ? 'password' : 'text'}
                  placeholder="- - - - - - - -"
                  name="password"
                  onChange={handleChange}
                /> */}
                <Input.Password 
                    className="box__input "
                    id="password"
                    placeholder="input password"
                    type={showPassword ? 'password' : "text"}
                    name="password"
                    onChange={handleChange} />
              </div>

              <div className="box__detail space">
                <span className="box__active">

                  <input
                    id="checkboxID"
                    type="checkbox"
                    checked={!showPassword}
                    onChange={toggleShowPassword}
                  />
                  <label htmlFor="checkboxID"> Mostrar </label>
                </span>
                <span className="box__active">Recuperar contraseña</span>
              </div>
              <div>
                <input
                  className="box__button"
                  type="button"
                  value="INICIAR"
                  onClick={handleSumbit}
                />
              </div>
              {authError && <p className='error-message'>{authError}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default TemplateLogin;
