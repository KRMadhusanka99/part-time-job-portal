import React, { useState, useEffect } from 'react';
import { jobAPI, adminAPI } from './services/api';
import { useNavigate } from 'react-router-dom';

export const JobAdForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        employer: '',
        description: '',
        ageGroup: '',
        education: '',
        experience: '',
        role: '',
        photo: null,
        deadline: '',
        salary: '',
        location: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ageGroups, setAgeGroups] = useState([]);

    useEffect(() => {
        // Fetch age groups from admin API
        const fetchAgeGroups = async () => {
            try {
                const response = await adminAPI.getAllAgeGroups();
                setAgeGroups(response.data);
            } catch (err) {
                console.error('Failed to fetch age groups:', err);
            }
        };
        fetchAgeGroups();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
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
            // Create FormData object for file upload
            const jobData = new FormData();
            for (const key in formData) {
                if (formData[key] !== null) {
                    jobData.append(key, formData[key]);
                }
            }

            await jobAPI.createJob(jobData);
            navigate('/'); // Redirect to home page after successful submission
        } catch (err) {
            setError('Failed to create job posting. Please try again.');
            console.error('Error creating job:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="content-block">
                <div className="section-full bg-white submit-resume content-inner-2">
                    <div className="container">
                        <h2>Submit Job Details</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="col-lg-8 col-md-12">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Job Title</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Employer</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="employer"
                                        value={formData.employer}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Job Description</label>
                                    <textarea 
                                        className="form-control" 
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Age Group</label>
                                    <select 
                                        className="form-control"
                                        name="ageGroup"
                                        value={formData.ageGroup}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Age Group</option>
                                        {ageGroups.map((age, index) => (
                                            <option key={index} value={age}>{age}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Required Education</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="education"
                                        value={formData.education}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Experience</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Role</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Location</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Salary (Rs.)</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        name="salary"
                                        value={formData.salary}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Photo (optional)</label>
                                    <div className="custom-file">
                                        <input 
                                            type="file" 
                                            className="site-button" 
                                            id="customFile"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Deadline</label>
                                    <input 
                                        type="date" 
                                        className="form-control"
                                        name="deadline"
                                        value={formData.deadline}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="site-button" 
                                    disabled={loading}
                                >
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
