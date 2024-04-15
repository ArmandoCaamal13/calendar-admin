import React, { useState } from 'react';
import './loginEstruct.scss';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';

const TemplateLogin = () => {
  const [showPassword, setShowPassword] = useState(true);
  // const [form, setForm] = useState({
  //   password: '',
  //   username: '',
  // });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSumbit = async () => {
    if (email === '' || password === '') {
      Swal.fire({
        icon: 'error',
        title: 'Ingresa las credenciales correctas',
        text: 'Ingresa las credenciales correctas para iniciar sesion',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entendido'
      });
    } else {
      try {
        const response = await AuthService.login(email, password);
        if (response) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Access authorized',
            showConfirmButton: false,
            timer: 1200
          }).then(() => {
            navigate('/');
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'Este portal está destinado solo para administradores',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Entendido'
          });
        }
      } catch (error) {
        if (error.response && error.response.status === 400 || error.response && error.response.status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'Credenciales incorrectas',
            text: 'Por favor, verifica tus credenciales e intenta de nuevo',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Entendido'
          });
        }
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
                  placeholder='Email'
                  name='email'
                  maxLength={50}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete='off'
                  onKeyDown={(e) => {
                    if (/[<>\\/]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <div className='login__field'>
                <i className='login__icon fas fa-lock'></i>
                <input
                  type={showPassword ? 'password' : 'text'}
                  className='login__input'
                  placeholder='Password'
                  name='password'
                  maxLength={15}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete='off'
                  onKeyDown={(e) => {
                    if (/[<>\\/]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                <button type="button" onClick={toggleShowPassword} className="password-toggle-button">
                  {showPassword ? <i className='login__icon fas fa-lock'></i> : <i className='login__icon fas fa-unlock'></i>}
                </button>
              </div>
              <div className="login__submit">
                <input type="button" value="Login" className="button__input" onClick={handleSumbit} />
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
