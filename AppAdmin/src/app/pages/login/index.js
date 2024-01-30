import React, { useEffect, useState } from 'react';
import './loginEstruct.scss';
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import AuthService from '../../services/auth.service';
import Swal from 'sweetalert2';

const TemplateLogin = () => {
  // const dispatch = useDispatch();
  const [validate, setValidate] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [form, setForm] = useState({
    password: '',
    username: '',
  });

  const [authError, setAuthError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSumbit = async () => {
    try {
      const response = await AuthService.login(form.username, form.password);

      if (response) {
        console.log(response.username, response.password);
        if (response.roles && response.roles.includes('ROLE_ADMIN')) {
          Swal.fire({
            position:'center',
            icon:'success',
            title:'Access authorized',
            showConfirmButton:false,
            timer:1200
          }).then(() => {
            navigate('/');
          })
        } else {
          alert("Acceso denegado. Este portal está destinado solo para administradores.");
        }
      } else {
        setAuthError('Credenciales incorrectas');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Contraseña incorrecta");
      } else if (error.response && error.response.status === 404) {
        alert("Usuario incorrecto");
      } else {
        alert("Credenciales incorrectas");
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
       <div className="container__login">
        <div className="screen">
          <div className="screen__content">
            <div className='img__form'>
            <img src='https://crm3.dtraveller.com/Content/images/dtraveller-white.png'
              className='img'
            />
            </div>
            
            <form className='login'>
              <div className='login__field'>
                <i className='login__icon fas fa-user'></i>
                <input
                  type='text'
                  className='login__input'
                  placeholder='Username'
                  name='username'
                  onChange={handleChange}
                  autoComplete='off'
                />
              </div>
              <div className='login__field'>
                <i className='login__icon fas fa-lock'></i>
                <input
                  type={showPassword ? 'password' : 'text'}
                  className='login__input'
                  placeholder='Password'
                  name='password'
                  onChange={handleChange}
                  autoComplete='off'
                />
                <button type="button" onClick={toggleShowPassword} className="password-toggle-button">
                  {showPassword ? <i className='login__icon fas fa-lock'></i> : <i className='login__icon fas fa-unlock'></i>}
                </button>
              </div>
              <div className="login__submit">
                <input type="button" value="Login" className="button__input" onClick={handleSumbit}/>
                <i className="button__icon fas fa-chevron-right"></i>
              </div>
            </form>
          </div>
          {/* <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div> */}
        </div>
      </div>

      <footer className='footer_login'>
        <span>© 2024 - Developer by DTraveller</span>
      </footer>
    </>
  );
};


export default TemplateLogin;
