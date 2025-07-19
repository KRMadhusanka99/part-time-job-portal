import React, { useState, useEffect } from 'react';
import { resumeAPI, adminAPI } from './services/api';
import { useNavigate } from 'react-router-dom';

export const BrowseCandidates = () => {
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        jobTitle: ''
    });
    const [jobTitles, setJobTitles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const candidatesPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if user is authenticated
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const [candidatesRes, titlesRes] = await Promise.all([
                    resumeAPI.getAllResumes(),
                    adminAPI.getAllJobTitles()
                ]);

                if (candidatesRes.data) {
                    setCandidates(candidatesRes.data);
                }

                if (titlesRes.data) {
                    setJobTitles(titlesRes.data);
                }

                setLoading(false);
            } catch (err) {
                console.error('Error fetching candidates:', err);
                if (err.response?.status === 401) {
                    navigate('/login');
                    return;
                }
                setError('Failed to fetch candidates. Please try again later.');
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const filteredCandidates = candidates.filter(candidate => {
        const matchesKeyword = 
            (candidate.user?.firstName || '').toLowerCase().includes(filters.keyword.toLowerCase()) ||
            (candidate.user?.lastName || '').toLowerCase().includes(filters.keyword.toLowerCase()) ||
            (candidate.description || '').toLowerCase().includes(filters.keyword.toLowerCase());

        const matchesLocation = !filters.location || 
            (candidate.region?.name || '').toLowerCase().includes(filters.location.toLowerCase());

        const matchesJobTitle = !filters.jobTitle || 
            candidate.jobTitle?.id === parseInt(filters.jobTitle);

        return matchesKeyword && matchesLocation && matchesJobTitle;
    });

    // Pagination
    const indexOfLastCandidate = currentPage * candidatesPerPage;
    const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
    const currentCandidates = filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);
    const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);

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
            <div className="page-content bg-white">
                <div className="content-block">
                    <div className="section-full bg-white browse-job content-inner-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-9 col-lg-8">
                                    <div className="job-title-bx">
                                        <h2 className="m-b5">Browse Candidates</h2>
                                        <h6 className="fw4 m-b0">{filteredCandidates.length} Candidates Found</h6>
                                    </div>

                                    {currentCandidates.length > 0 ? (
                                        <ul className="post-job-bx">
                                            {currentCandidates.map((candidate, index) => (
                                                <li key={candidate.id || index}>
                                                    <a href="#" onClick={(e) => e.preventDefault()}>
                                                        <div className="d-flex m-b30">
                                                            <div className="job-post-company">
                                                                <span>
                                                                    <img 
                                                                        src={candidate.photo || "assets/images/testimonials/default-avatar.jpg"} 
                                                                        alt={`${candidate.user?.firstName} ${candidate.user?.lastName}`}
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div className="job-post-info">
                                                                <h4>{candidate.user?.firstName} {candidate.user?.lastName}</h4>
                                                                <ul>
                                                                    <li><i className="fa fa-map-marker"></i> {candidate.region?.name}</li>
                                                                    <li><i className="fa fa-briefcase"></i> {candidate.jobTitle?.title}</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex">
                                                            <div className="job-time mr-auto">
                                                                <span>Expected Minimum Rate: <b>Rs. {candidate.minRate}</b></span>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target={`#candidateModal${index}`}
                                                            >
                                                                View Profile <i className="fa fa-user"></i>
                                                            </button>
                                                        </div>
                                                    </a>

                                                    {/* Modal */}
                                                    <div className="modal fade" id={`candidateModal${index}`} tabIndex="-1">
                                                        <div className="modal-dialog modal-lg modal-dialog-centered">
                                                            <div className="modal-content">
                                                                <div className="modal-header border-0">
                                                                    <h5 className="modal-title">Candidate Profile</h5>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <div className="row g-3">
                                                                        <div className="col-md-4">
                                                                            <img 
                                                                                src={candidate.photo || "assets/images/testimonials/default-avatar.jpg"} 
                                                                                alt={`${candidate.user?.firstName} ${candidate.user?.lastName}`}
                                                                                className="img-fluid rounded"
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-8">
                                                                            <h4>{candidate.user?.firstName} {candidate.user?.lastName}</h4>
                                                                            <p className="text-muted">{candidate.jobTitle?.title}</p>
                                                                            <div className="row mb-3">
                                                                                <div className="col-md-6">
                                                                                    <p><strong>Location:</strong> {candidate.region?.name}</p>
                                                                                    <p><strong>Experience:</strong> {candidate.experience} years</p>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <p><strong>Minimum Rate:</strong> Rs. {candidate.minRate}/hr</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <h5>About</h5>
                                                                                <p>{candidate.description}</p>
                                                                            </div>
                                                                            <div>
                                                                                <h5>Skills</h5>
                                                                                <div className="d-flex flex-wrap gap-2">
                                                                                    {candidate.skills?.map((skill, i) => (
                                                                                        <span key={i} className="badge bg-light text-dark m-1">
                                                                                            {skill}
                                                                                        </span>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="modal-footer border-0">
                                                                    <button type="button" className="btn btn-primary">
                                                                        Contact Candidate
                                                                    </button>
                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                                                        Close
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="alert alert-info">
                                            No candidates found matching your criteria. Try adjusting your filters.
                                        </div>
                                    )}

                                    {/* Pagination */}
                                    {currentCandidates.length > 0 && (
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
                                    )}
                                </div>

                                {/* Filters Sidebar */}
                                <div className="col-xl-3 col-lg-4">
                                    <div className="sticky-top">
                                        <div className="clearfix m-b30">
                                            <h5 className="widget-title font-weight-700 text-uppercase">Search</h5>
                                            <div>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Search candidates" 
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
        </div>
    );
};
