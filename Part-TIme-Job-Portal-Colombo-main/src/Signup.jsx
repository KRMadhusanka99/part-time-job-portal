import React, { useState } from 'react';
import axiosInstance from './utils/axiosInstance';

export const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roleId: 2
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/user/register', formData); // Replace with your actual endpoint
            alert('Account created successfully!');
            // Optional: Redirect to login page or clear form
        } catch (error) {
            console.error('Signup error:', error.response?.data || error.message);
            alert('Failed to create account.');
        }
    };

    return (
        <div className="page-content bg-white">
            <div className="section-full content-inner shop-account">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h3 className="font-weight-700 m-t0 m-b20">Create An Account</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 m-b30">
                            <div className="p-a30 border-1 max-w500 m-auto">
                                <div className="tab-content">
                                    <form onSubmit={handleSubmit}>
                                        <h4 className="font-weight-700 text-center">PERSONAL INFORMATION</h4>

                                        <div className="form-group">
                                            <label className="font-weight-700">First Name *</label>
                                            <input
                                                name="firstName"
                                                required
                                                className="form-control"
                                                placeholder="First Name"
                                                type="text"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="font-weight-700">Last Name *</label>
                                            <input
                                                name="lastName"
                                                required
                                                className="form-control"
                                                placeholder="Last Name"
                                                type="text"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="font-weight-700">E-MAIL *</label>
                                            <input
                                                name="email"
                                                required
                                                className="form-control"
                                                placeholder="Your Email Id"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="font-weight-700">PASSWORD *</label>
                                            <input
                                                name="password"
                                                required
                                                className="form-control"
                                                placeholder="Type Password"
                                                type="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="font-weight-700 mt-2">ROLE *</label>
                                            <select
                                                name="roleId"
                                                className="form-control"
                                                value={formData.roleId}
                                                onChange={handleChange}
                                            >
                                                <option value = {2}>Job Seeker</option>
                                                <option value = {1}>Employer</option>
                                            </select>
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="site-button button-lg primary align-center">
                                                CREATE
                                            </button>
                                        </div>

                                        <div className="mt-2">
                                            <p className="font-weight-600">
                                                If you have an account with us, please <a href="/Login">Log in.</a>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
