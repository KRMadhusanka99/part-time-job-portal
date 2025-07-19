import React, { useState, useEffect } from 'react';
import { jobAPI, adminAPI } from './services/api';
import JobCard from './components/JobCard';

export const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [location, setLocation] = useState('');
    const [jobTypes, setJobTypes] = useState([]);

    // Fetch jobs and job types on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [jobsResponse, jobTitlesResponse] = await Promise.all([
                    jobAPI.getAllJobs(),
                    adminAPI.getAllJobTitles()
                ]);
                setJobs(jobsResponse.data);
                setJobTypes(jobTitlesResponse.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch jobs. Please try again later.');
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Handle search form submission
    const handleSearch = (e) => {
        e.preventDefault();
        // Filter jobs based on search criteria
        // This would ideally be handled by the backend with proper API parameters
        const filteredJobs = jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = !selectedCategory || job.category === selectedCategory;
            const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
            return matchesSearch && matchesCategory && matchesLocation;
        });
        setJobs(filteredJobs);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className="page-content">
                <div className="dez-bnr-inr dez-bnr-inr-md" style={{ backgroundImage: `url('/assets/images/main-slider/slider3.png')` }}>
                    <div className="container">
                        <div className="dez-bnr-inr-entry align-m ">
                            <div className="find-job-bx">
                                <p className="site-button button-sm">Find Part-time Jobs around Colombo</p>
                                <h2>Discover <span className="text-primary"> Part-Time Jobs</span> <br />that fit your schedule, goals, and lifestyle.</h2>
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
                                <a href="/BrowseJobs" className="site-button button-sm">Browse All Jobs <i className="fa fa-long-arrow-right"></i></a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8">
                                <ul className="post-job-bx">
                                    {jobs.map((job, index) => (
                                        <JobCard 
                                            key={job._id || index} 
                                            job={job} 
                                            modalId={`jobModal${index}`}
                                        />
                                    ))}
                                </ul>
                            </div>
                            
                            {/* Sidebar filters remain the same */}
                            <div className="col-xl-3 col-lg-4">
                                <div class="sticky-top">
                                    <div class="clearfix m-b30">
                                        <h5 class="widget-title font-weight-700 text-uppercase">Keywords</h5>
                                        <div class="">
                                            <input type="text" class="form-control" placeholder="Search" />
                                        </div>
                                    </div>
                                    <div class="clearfix mb-2">
                                        <h5 class="widget-title font-weight-700 text-uppercase">Category</h5>
                                        <select>
                                            <option>Any Category</option>
                                            <option>Automotive Jobs</option>
                                            <option>Construction Facilities</option>
                                            <option>Design, Art & Multimedia</option>
                                            <option>Food Services</option>
                                        </select>
                                    </div>

                                    <div class="clearfix m-b10">
                                        <h5 class="widget-title font-weight-700 m-t0 text-uppercase">Location</h5>
                                        <input type="text" class="form-control m-b30" placeholder="Location" />
                                        <div class="input-group m-b20">
                                            <input type="text" class="form-control" placeholder="120" />
                                            <select>
                                                <option>Km</option>
                                                <option>miles</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="clearfix m-b30">
                                        <h5 class="widget-title font-weight-700 text-uppercase">Job type</h5>
                                        <div class="row">
                                            <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                                                <div class="product-brand">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="job6" name="job_role[]" />
                                                        <label class="custom-control-label" for="job6">Decorator</label>
                                                    </div>
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="job7" name="job_role[]" />
                                                        <label class="custom-control-label" for="job7">Announcer</label>
                                                    </div>
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="job8" name="job_role[]" />
                                                        <label class="custom-control-label" for="job8">Stock</label>
                                                    </div>
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="job9" name="job_role[]" />
                                                        <label class="custom-control-label" for="job9">Cashier</label>
                                                    </div>
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="job10" name="job_role[]" />
                                                        <label class="custom-control-label" for="job10">Delivery</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                                                <div class="product-brand">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="job1" name="job_role[]" />
                                                        <label class="custom-control-label" for="job1">Event</label>
                                                    </div>
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="job2" name="job_role[]" />
                                                        <label class="custom-control-label" for="job2">Promotion</label>
                                                    </div>
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="job3" name="job_role[]" />
                                                        <label class="custom-control-label" for="job3">Sales</label>
                                                    </div>
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="job4" name="job_role[]" />
                                                        <label class="custom-control-label" for="job4">Mascot</label>
                                                    </div>
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="job5" name="job_role[]" />
                                                        <label class="custom-control-label" for="job5">Bouncer</label>
                                                    </div>
                                                </div>
                                            </div>
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
