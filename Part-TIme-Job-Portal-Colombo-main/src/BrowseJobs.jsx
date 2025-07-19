import React, { useState, useEffect } from 'react';
import { jobAPI, adminAPI } from './services/api';
import JobCard from './components/JobCard';

export const BrowseJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        selectedRoles: []
    });
    const [jobRoles, setJobRoles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 10;

    // Fetch jobs and job roles on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [jobsResponse, rolesResponse] = await Promise.all([
                    jobAPI.getAllJobs(),
                    adminAPI.getAllRoles()
                ]);
                setJobs(jobsResponse.data);
                setJobRoles(rolesResponse.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch jobs. Please try again later.');
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox') {
            setFilters(prev => ({
                ...prev,
                selectedRoles: checked 
                    ? [...prev.selectedRoles, value]
                    : prev.selectedRoles.filter(role => role !== value)
            }));
        } else {
            setFilters(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Filter jobs based on criteria
    const filteredJobs = jobs.filter(job => {
        const matchesKeyword = job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
                             job.description.toLowerCase().includes(filters.keyword.toLowerCase());
        const matchesLocation = !filters.location || 
                              job.location.toLowerCase().includes(filters.location.toLowerCase());
        const matchesRole = filters.selectedRoles.length === 0 || 
                          filters.selectedRoles.includes(job.role);
        
        return matchesKeyword && matchesLocation && matchesRole;
    });

    // Pagination
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

    if (loading) return <div className="text-center p-5">Loading...</div>;
    if (error) return <div className="text-center p-5 text-danger">{error}</div>;

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
                            <div className="col-lg-8">
                                <ul className="post-job-bx">
                                    {currentJobs.map((job, index) => (
                                        <JobCard 
                                            key={job._id || index} 
                                            job={job} 
                                            modalId={`jobModal${index}`}
                                        />
                                    ))}
                                </ul>
                                
                                {/* Pagination */}
                                <div className="pagination-bx m-t30">
                                    <ul className="pagination">
                                        <li className={`previous ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <a href="#" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                                                <i className="ti-arrow-left"></i> Prev
                                            </a>
                                        </li>
                                        {[...Array(totalPages)].map((_, i) => (
                                            <li key={i} className={currentPage === i + 1 ? 'active' : ''}>
                                                <a href="#" onClick={() => setCurrentPage(i + 1)}>{i + 1}</a>
                                            </li>
                                        ))}
                                        <li className={`next ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <a href="#" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
                                                Next <i className="ti-arrow-right"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            {/* Filters Sidebar */}
                            <div className="col-xl-3 col-lg-4">
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

                                    <div className="clearfix m-b10">
                                        <h5 className="widget-title font-weight-700 m-t0 text-uppercase">Location</h5>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Location" 
                                            name="location"
                                            value={filters.location}
                                            onChange={handleFilterChange}
                                        />
                                    </div>

                                    <div className="clearfix m-b30">
                                        <h5 className="widget-title font-weight-700 text-uppercase">Job type</h5>
                                        <div className="row">
                                            {jobRoles.map((role, index) => (
                                                <div key={index} className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                    <div className="product-brand">
                                                        <div className="custom-control custom-checkbox">
                                                            <input 
                                                                type="checkbox" 
                                                                className="custom-control-input" 
                                                                id={`job${index}`}
                                                                name="selectedRoles"
                                                                value={role}
                                                                checked={filters.selectedRoles.includes(role)}
                                                                onChange={handleFilterChange}
                                                            />
                                                            <label className="custom-control-label" htmlFor={`job${index}`}>
                                                                {role}
                                                            </label>
                                                        </div>
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
