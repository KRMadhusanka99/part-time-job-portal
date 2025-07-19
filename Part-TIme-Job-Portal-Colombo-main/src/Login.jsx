import React, { useState } from 'react';
import axiosInstance from './utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await axiosInstance.post('/api/auth/login', {
        email,
        password,
      });

      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/'); // redirect after login
      }
    } catch (error) {
      setErrorMsg(error?.message || 'Login failed');
    }
  };

  return (
    <div className="page-content bg-white">
      <div className="section-full content-inner-2 shop-account">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h3 className="font-weight-700 m-t0 m-b20">Login Your Account</h3>
            </div>
          </div>
          <div className="max-w500 m-auto m-b30">
            <div className="p-a30 border-1 seth">
              <form onSubmit={handleLogin}>
                <h4 className="font-weight-700 text-center">LOGIN</h4>
                <p className="font-weight-600 text-center">If you have an account with us, please log in.</p>

                {errorMsg && (
                  <p className="text-danger text-center">{errorMsg}</p>
                )}

                <div className="form-group">
                  <label className="font-weight-700">E-MAIL *</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email Id"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="font-weight-700">PASSWORD *</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Type Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="site-button m-r5 button-lg">Login</button>
                </div>

                <p className="font-weight-600 text-center m-t20">
                  If you do not have an account please 
                  <a href="/signup" className="m-l5"><i className="fa fa-unlock-alt"></i> Sign up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
