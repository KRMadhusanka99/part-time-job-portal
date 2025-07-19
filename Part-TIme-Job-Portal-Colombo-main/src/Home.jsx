import React, { useState, useEffect } from 'react';
import { jobAPI, adminAPI } from './services/api';
import JobCard from './components/JobCard';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [location, setLocation] = useState('');
    const [jobTypes, setJobTypes] = useState([]);
    const navigate = useNavigate();

    // Fetch jobs and job types on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if user is authenticated
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const [jobsResponse, jobTitlesResponse] = await Promise.all([
                    jobAPI.getAllJobs(),
                    adminAPI.getAllJobTitles()
                ]);

                if (jobsResponse.data) {
                    setJobs(jobsResponse.data);
                }
                
                if (jobTitlesResponse.data) {
                    const titles = jobTitlesResponse.data.map(job => job.title);
                    setJobTypes(titles);
                }
                
                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                if (err.response?.status === 401) {
                    // Unauthorized - redirect to login
                    navigate('/login');
                    return;
                }
                setError('Failed to fetch jobs. Please try again later.');
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    // Handle search form submission
    const handleSearch = (e) => {
        e.preventDefault();
        // Filter jobs based on search criteria
        const filteredJobs = jobs.filter(job => {
            const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                job.description?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = !selectedCategory || job.jobTitle?.title === selectedCategory;
            const matchesLocation = !location || job.region?.name.toLowerCase().includes(location.toLowerCase());
            return matchesSearch && matchesCategory && matchesLocation;
        });
        setJobs(filteredJobs);
    };

    if (loading) return (
        <div className="page-content">
            <div className="container text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );

    if (error) return (
        <div className="page-content">
            <div className="container py-5">
                <div className="alert alert-danger" role="alert">
                    {error}
                    <button 
                        className="btn btn-outline-danger ml-3"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <div className="page-content">
                <div className="dez-bnr-inr dez-bnr-inr-md" style={{ backgroundImage: `url('/assets/images/main-slider/slider3.png')` }}>
                    <div className="container">
                        <div className="dez-bnr-inr-entry align-m">
                            <div className="find-job-bx">
                                <p className="site-button button-sm">Find Part-time Jobs around Colombo</p>
                                <h2>Discover <span className="text-primary">Part-Time Jobs</span> <br />that fit your schedule, goals, and lifestyle.</h2>
                                <form className="dezPlaceAni" onSubmit={handleSearch}>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-6">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        placeholder="Job Title, Keywords, or Phrase"
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                    />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text"><i className="fa fa-search"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        placeholder="City, State or ZIP"
                                                        value={location}
                                                        onChange={(e) => setLocation(e.target.value)}
                                                    />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text"><i className="fa fa-map-marker"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6">
                                            <div className="form-group">
                                                <select 
                                                    value={selectedCategory}
                                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                                    className="form-control"
                                                >
                                                    <option value="">Select Sector</option>
                                                    {jobTypes.map((type, index) => (
                                                        <option key={index} value={type}>{type}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-6">
                                            <button type="submit" className="site-button btn-block">Find Job</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section-full bg-white content-inner-2">
                    <div className="container">
                        <div className="d-flex job-title-bx section-head">
                            <div className="mr-auto">
                                <h2 className="m-b5">Recent Jobs</h2>
                                <h6 className="fw4 m-b0">{jobs.length}+ Recently Added Jobs</h6>
                            </div>
                            <div className="align-self-end">
                                <a href="/browsejobs" className="site-button button-sm">Browse All Jobs <i className="fa fa-long-arrow-right"></i></a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-9">
                                {jobs.length > 0 ? (
                                <ul className="post-job-bx">
                                        {jobs.map((job, index) => (
                                            <JobCard 
                                                key={job._id || index} 
                                                job={job} 
                                                modalId={`jobModal${index}`}
                                            />
                                        ))}
                                                                                </ul>
                                ) : (
                                    <div className="alert alert-info">
                                        No jobs found. Try adjusting your search criteria.
                                    </div>
                                )}
                            </div>
                            
                            <div className="col-lg-3">
                                <div className="sticky-top">
                                    <div className="clearfix m-b30">
                                        <h5 className="widget-title font-weight-700 text-uppercase">Quick Search</h5>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Search by keyword"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                    <div className="clearfix m-b30">
                                        <h5 className="widget-title font-weight-700 text-uppercase">Location</h5>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Enter location"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                    </div>

                                    <div className="clearfix m-b30">
                                        <h5 className="widget-title font-weight-700 text-uppercase">Job Categories</h5>
                                        <div className="row">
                                            {jobTypes.map((type, index) => (
                                                <div key={index} className="col-lg-12">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id={`jobType${index}`}
                                                            checked={selectedCategory === type}
                                                            onChange={() => setSelectedCategory(selectedCategory === type ? '' : type)}
                                                        />
                                                        <label className="custom-control-label" htmlFor={`jobType${index}`}>
                                                            {type}
                                                        </label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
