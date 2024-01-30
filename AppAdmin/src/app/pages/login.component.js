import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

const required = value => {
    if (!value) {
        return "This field is required!";
    }
    return null;
};

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            // Validaciones de formulario aquí si es necesario

            await authService.login(username, password);
            navigate("/");
            window.location.reload();
        } catch (error) {
            const resMessage = 
                (error.response && 
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            setMessage(resMessage);
            setLoading(false);
        }
    };

    return (
        <div className='col-md-12'>
            <div className='card card-container'>
                {/* <img
                    src=''
                    alt='profile-img'
                    className='profile-img-card'
                /> */}

                <form onSubmit={handleLogin}>
                    <div className='form-group'>
                        <label htmlFor='username'>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {required(username)}
                    </div>

                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {required(password)}
                    </div>
                    <div className='form-group'>
                        <button
                            className='btn btn-primary btn-block'
                            disabled={loading}
                        >
                            {loading && (
                                <span className='spinner-border spinner-border-sm'></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className='form-group'>
                            <div className='alert alert-danger' role='alert'>
                                {message}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Login;
