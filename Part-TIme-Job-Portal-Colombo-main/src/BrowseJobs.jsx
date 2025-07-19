import React, { useState, useEffect } from 'react';
import { jobAPI, adminAPI } from './services/api';
import JobCard from './components/JobCard';
import { useNavigate } from 'react-router-dom';

export const BrowseJobs = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        jobTitle: ''
    });
    const [jobTitles, setJobTitles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 10;

    // Fetch jobs and job titles on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if user is authenticated
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const [jobsResponse, titlesResponse] = await Promise.all([
                    jobAPI.getAllJobs(),
                    adminAPI.getAllJobTitles()
                ]);

                if (jobsResponse.data) {
                    setJobs(jobsResponse.data);
                }

                if (titlesResponse.data) {
                    setJobTitles(titlesResponse.data);
                }

                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                if (err.response?.status === 401) {
                    navigate('/login');
                    return;
                }
                setError('Failed to fetch jobs. Please try again later.');
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Filter jobs based on criteria
    const filteredJobs = jobs.filter(job => {
        const matchesKeyword = 
            (job.jobTitle?.title || '').toLowerCase().includes(filters.keyword.toLowerCase()) ||
            (job.description || '').toLowerCase().includes(filters.keyword.toLowerCase());
        
        const matchesLocation = !filters.location || 
            (job.region?.name || '').toLowerCase().includes(filters.location.toLowerCase());
        
        const matchesJobTitle = !filters.jobTitle || 
            job.jobTitle?.id === parseInt(filters.jobTitle);
        
        return matchesKeyword && matchesLocation && matchesJobTitle;
    });

    // Pagination
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

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
                <div className="section-full bg-white content-inner-2">
                    <div className="container">
                        <div className="d-flex job-title-bx section-head">
                            <div className="mr-auto">
                                <h2 className="m-b5">Browse Jobs</h2>
                                <h6 className="fw4 m-b0">{filteredJobs.length} Jobs Found</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-9">
                                {currentJobs.length > 0 ? (
                                    <>
                                        <ul className="post-job-bx">
                                            {currentJobs.map((job, index) => (
                                                <JobCard 
                                                    key={job.id || index} 
                                                    job={job} 
                                                    modalId={`jobModal${index}`}
                                                />
                                            ))}
                                        </ul>
                                        
                                        {/* Pagination */}
                                        <div className="pagination-bx m-t30">
                                            <ul className="pagination">
                                                <li className={`previous ${currentPage === 1 ? 'disabled' : ''}`}>
                                                    <a href="#" onClick={(e) => {
                                                        e.preventDefault();
                                                        setCurrentPage(prev => Math.max(prev - 1, 1));
                                                    }}>
                                                        <i className="ti-arrow-left"></i> Prev
                                                    </a>
                                                </li>
                                                {[...Array(totalPages)].map((_, i) => (
                                                    <li key={i} className={currentPage === i + 1 ? 'active' : ''}>
                                                        <a href="#" onClick={(e) => {
                                                            e.preventDefault();
                                                            setCurrentPage(i + 1);
                                                        }}>{i + 1}</a>
                                                    </li>
                                                ))}
                                                <li className={`next ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                    <a href="#" onClick={(e) => {
                                                        e.preventDefault();
                                                        setCurrentPage(prev => Math.min(prev + 1, totalPages));
                                                    }}>
                                                        Next <i className="ti-arrow-right"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <div className="alert alert-info">
                                        No jobs found matching your criteria. Try adjusting your filters.
                                    </div>
                                )}
                            </div>
                            
                            {/* Filters Sidebar */}
                            <div className="col-lg-3">
                                <div className="sticky-top">
                                    <div className="clearfix m-b30">
                                        <h5 className="widget-title font-weight-700 text-uppercase">Keywords</h5>
                                        <div>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Search by keywords" 
                                                name="keyword"
                                                value={filters.keyword}
                                                onChange={handleFilterChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="clearfix m-b30">
                                        <h5 className="widget-title font-weight-700 text-uppercase">Job Title</h5>
                                        <select 
                                            className="form-control"
                                            name="jobTitle"
                                            value={filters.jobTitle}
                                            onChange={handleFilterChange}
                                        >
                                            <option value="">All Job Titles</option>
                                            {jobTitles.map((title) => (
                                                <option key={title.id} value={title.id}>
                                                    {title.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="clearfix m-b30">
                                        <h5 className="widget-title font-weight-700 text-uppercase">Location</h5>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Enter location" 
                                            name="location"
                                            value={filters.location}
                                            onChange={handleFilterChange}
                                        />
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
