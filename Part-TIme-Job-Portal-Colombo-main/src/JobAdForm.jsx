import React, { useState, useEffect } from 'react';
import { jobAPI, adminAPI } from './services/api';
import { useNavigate } from 'react-router-dom';

export const JobAdForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        salary: '',
        deadline: '',
        photo: null,
        employerId: '',
        ageId: '',
        jobTitleId: '',
        regionId: '',
        education: '',
        experience: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ageGroups, setAgeGroups] = useState([]);
    const [jobTitles, setJobTitles] = useState([]);
    const [regions, setRegions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if user is authenticated
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');
                if (!token || !userId) {
                    navigate('/login');
                    return;
                }

                // Set employer ID from logged in user
                setFormData(prev => ({
                    ...prev,
                    employerId: parseInt(userId)
                }));

                // Fetch all required data
                const [ageGroupsRes, jobTitlesRes, regionsRes] = await Promise.all([
                    adminAPI.getAllAgeGroups(),
                    adminAPI.getAllJobTitles(),
                    adminAPI.getAllRegions()
                ]);

                setAgeGroups(ageGroupsRes.data);
                setJobTitles(jobTitlesRes.data);
                setRegions(regionsRes.data);
            } catch (err) {
                console.error('Failed to fetch form data:', err);
                setError('Failed to load form data. Please try again later.');
            }
        };
        fetchData();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'salary' ? parseFloat(value) : 
                    ['ageId', 'jobTitleId', 'regionId'].includes(name) ? parseInt(value) : 
                    value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            photo: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Create FormData object
            const jobData = new FormData();
            
            // Add all form fields
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null && formData[key] !== '') {
                    if (key === 'photo') {
                        if (formData[key] instanceof File) {
                            jobData.append(key, formData[key]);
                        }
                    } else {
                        jobData.append(key, formData[key]);
                    }
                }
            });

            await jobAPI.createJob(jobData);
            alert('Job posted successfully!');
            navigate('/browsejobs');
        } catch (err) {
            console.error('Error creating job:', err);
            setError(err.response?.data?.message || 'Failed to create job posting. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="content-block">
                <div className="section-full bg-white submit-resume content-inner-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h2>Post a New Job</h2>
                                <p>Create a new job posting for part-time positions</p>
                            </div>
                        </div>
                        
                        {error && (
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="alert alert-danger">{error}</div>
                                </div>
                            </div>
                        )}

                        <div className="row">
                            <div className="col-lg-8 col-md-12 m-auto">
                                <form onSubmit={handleSubmit} className="job-post-form">
                                    <div className="form-group">
                                        <label>Job Title</label>
                                        <select 
                                            className="form-control"
                                            name="jobTitleId"
                                            value={formData.jobTitleId}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Job Title</option>
                                            {jobTitles.map((title) => (
                                                <option key={title.id} value={title.id}>
                                                    {title.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Job Description</label>
                                        <textarea 
                                            className="form-control" 
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            required
                                            rows="4"
                                            placeholder="Describe the job responsibilities, requirements, and other details"
                                        ></textarea>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Region</label>
                                                <select 
                                                    className="form-control"
                                                    name="regionId"
                                                    value={formData.regionId}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="">Select Region</option>
                                                    {regions.map((region) => (
                                                        <option key={region.id} value={region.id}>
                                                            {region.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Age Group</label>
                                                <select 
                                                    className="form-control"
                                                    name="ageId"
                                                    value={formData.ageId}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="">Select Age Group</option>
                                                    {ageGroups.map((age) => (
                                                        <option key={age.id} value={age.id}>
                                                            {age.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Required Education</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="education"
                                                    value={formData.education}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="e.g., Bachelor's Degree, High School Diploma"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Required Experience (years)</label>
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    name="experience"
                                                    value={formData.experience}
                                                    onChange={handleInputChange}
                                                    required
                                                    min="0"
                                                    step="0.5"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Salary (Rs. per hour)</label>
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    name="salary"
                                                    value={formData.salary}
                                                    onChange={handleInputChange}
                                                    required
                                                    min="0"
                                                    step="0.01"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Application Deadline</label>
                                                <input 
                                                    type="date" 
                                                    className="form-control"
                                                    name="deadline"
                                                    value={formData.deadline}
                                                    onChange={handleInputChange}
                                                    required
                                                    min={new Date().toISOString().split('T')[0]}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Company Logo (optional)</label>
                                        <div className="custom-file">
                                            <input 
                                                type="file" 
                                                className="site-button" 
                                                onChange={handleFileChange}
                                                accept="image/*"
                                            />
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <button 
                                            type="submit" 
                                            className="site-button button-lg" 
                                            disabled={loading}
                                        >
                                            {loading ? 'Posting Job...' : 'Post Job'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
