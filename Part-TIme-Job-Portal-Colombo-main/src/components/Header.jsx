import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="site-header mo-left header">
      <div className="sticky-header main-bar-wraper navbar-expand-lg">
        <div className="main-bar clearfix ">
          <div className="container clearfix">
            <div className="logo-header mostion">
              <Link to="/">
                <img src="/assets/images/logo.png" alt="" />
              </Link>
            </div>

            <button className="navbar-toggler collapsed navicon justify-content-end" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className="header-nav navbar-collapse collapse justify-content-end" id="navbarNavDropdown">
              <div className="logo-header mostion">
                <Link to="/">
                  <img src="/assets/images/logo.png" alt="" />
                </Link>
              </div>
              <ul className="nav navbar-nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/browsejobs">Browse Jobs</Link></li>
                <li><Link to="/browsecandidates">Browse Candidates</Link></li>
                <li><Link to="/aboutus">About Us</Link></li>
                <li><Link to="/contactus">Contact Us</Link></li>
              </ul>

              <div className="extra-nav">
                <div className="extra-cell">
                  {user ? (
                    <>
                      <span className="mr-3">Welcome, {user.name}</span>
                      {user.role === '1' ? (
                        <Link to="/jobadform" className="site-button mr-3"><i className="fa fa-plus"></i> Post a Job</Link>
                      ) : (
                        <Link to="/candidateform" className="site-button mr-3"><i className="fa fa-user"></i> Submit Resume</Link>
                      )}
                      <button onClick={handleLogout} className="site-button"><i className="fa fa-sign-out"></i> Logout</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="site-button mr-3"><i className="fa fa-sign-in"></i> Login</Link>
                      <Link to="/signup" className="site-button"><i className="fa fa-user-plus"></i> Sign Up</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
