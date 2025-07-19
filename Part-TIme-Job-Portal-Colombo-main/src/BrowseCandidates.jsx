import React, { useState, useEffect } from 'react';
import { adminAPI } from './services/api';

export const BrowseCandidates = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        selectedRoles: []
    });
    const [currentPage, setCurrentPage] = useState(1);
    const candidatesPerPage = 10;

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await adminAPI.getAllResumes();
                setCandidates(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch candidates. Please try again later.');
                setLoading(false);
            }
        };
        fetchCandidates();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Filter candidates based on search criteria
    const filteredCandidates = candidates.filter(candidate => {
        const matchesKeyword = candidate.name.toLowerCase().includes(filters.keyword.toLowerCase()) ||
                             candidate.professionalTitle.toLowerCase().includes(filters.keyword.toLowerCase()) ||
                             candidate.skills.toLowerCase().includes(filters.keyword.toLowerCase());
        const matchesLocation = !filters.location || 
                              candidate.region.toLowerCase().includes(filters.location.toLowerCase());
        return matchesKeyword && matchesLocation;
    });

    // Pagination
    const indexOfLastCandidate = currentPage * candidatesPerPage;
    const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
    const currentCandidates = filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);
    const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);

    if (loading) return <div className="text-center p-5">Loading...</div>;
    if (error) return <div className="text-center p-5 text-danger">{error}</div>;

    return (
        <div>
            <div className="page-content bg-white">
                <div className="content-block">
                    <div className="section-full bg-white browse-job content-inner-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-9 col-lg-8">
                                    <div className="m-b30">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Search Candidates"
                                            name="keyword"
                                            value={filters.keyword}
                                            onChange={handleFilterChange}
                                        />
                                    </div>
                                    <ul className="post-job-bx">
                                        {currentCandidates.map((candidate, index) => (
                                            <li key={candidate._id || index}>
                                            <a href="#">
                                                <div className="d-flex m-b30">
                                                    <div className="job-post-company">
                                                            <span>
                                                                <img 
                                                                    src={candidate.photo || "assets/images/testimonials/default-avatar.jpg"} 
                                                                    alt={candidate.name}
                                                                />
                                                            </span>
                                                    </div>
                                                    <div className="job-post-info">
                                                            <h4>{candidate.name}</h4>
                                                        <ul>
                                                                <li><i className="fa fa-map-marker"></i> {candidate.region}</li>
                                                                <li><i className="fa fa-bookmark-o"></i> {candidate.professionalTitle}</li>
                                                        </ul>
                                                        </div>
                                                </div>
                                                <div className="d-flex">
                                                    <div className="job-time mr-auto">
                                                            <span>Expected Minimum Salary: <b>Rs. {candidate.minimumRate}</b></span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        data-bs-toggle="modal"
                                                            data-bs-target={`#candidateModal${index}`}
                                                    >
                                                            View More <i className="ri-hand-heart-fill"></i>
                                                    </button>

                                                        <div className="modal fade" id={`candidateModal${index}`} tabIndex="-1">
                                                        <div className="modal-dialog modal-lg modal-dialog-centered mt-5 pt-5">
                                                            <div className="modal-content">
                                                                <div className="modal-header border-0">
                                                                        <h5 className="modal-title">Candidate Profile</h5>
                                                                    <button
                                                                        type="button"
                                                                        className="btn-close"
                                                                        data-bs-dismiss="modal"
                                                                        aria-label="Close"
                                                                    ></button>
                                                                </div>

                                                                <div className="modal-body">
                                                                    <div className="row g-3 align-items-start">
                                                                        <div className="col-md-4">
                                                                            <img
                                                                                    src={candidate.photo || "assets/images/testimonials/default-avatar.jpg"}
                                                                                    alt={candidate.name}
                                                                                className="img-fluid rounded shadow-sm"
                                                                            />
                                                                        </div>

                                                                        <div className="col-md-8">
                                                                                <h4 className="fw-bold">{candidate.name}</h4>
                                                                                <p className="text-muted small">{candidate.description}</p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row text-center mt-4">
                                                                        <div className="col-md-3">
                                                                                <p><strong><i className="fa fa-map-marker"></i> {candidate.region}</strong></p>
                                                                            </div>
                                                                            <div className="col-md-3">
                                                                                <p><strong><i className="fa fa-briefcase"></i> {candidate.experience}</strong></p>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                                <p><strong><i className="fa fa-usd"></i> Rs. {candidate.minimumRate}</strong></p>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                                <p><strong><i className="fa fa-tags"></i> {candidate.category}</strong></p>
                                                                            </div>
                                                                        </div>

                                                                        <div className="mt-4">
                                                                            <h5>Skills</h5>
                                                                            <p>{candidate.skills}</p>
                                                                    </div>
                                                                </div>

                                                                <div className="modal-footer border-0">
                                                                    <button type="button" className="btn btn-primary">
                                                                        Contact Now
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-outline-secondary"
                                                                        data-bs-dismiss="modal"
                                                                    >
                                                                        Close
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        ))}
                                    </ul>

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
