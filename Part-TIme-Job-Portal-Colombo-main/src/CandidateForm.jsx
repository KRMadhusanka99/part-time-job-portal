import React, { useState, useEffect } from 'react';
import { adminAPI } from './services/api';
import { useNavigate } from 'react-router-dom';

export const CandidateForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        region: '',
        professionalTitle: '',
        experience: '',
        photo: null,
        minimumRate: '',
        category: '',
        skills: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [regions, setRegions] = useState([]);

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await adminAPI.getAllRegions();
                setRegions(response.data);
            } catch (err) {
                console.error('Failed to fetch regions:', err);
                setError('Failed to load regions. Please try again later.');
            }
        };
        fetchRegions();
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
            // Get user ID from localStorage (assuming it's stored during login)
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('Please login to submit your resume');
            }

            // Create FormData object for file upload
            const resumeData = new FormData();
            for (const key in formData) {
                if (formData[key] !== null) {
                    resumeData.append(key, formData[key]);
                }
            }
            resumeData.append('userId', userId);

            await adminAPI.createResume(resumeData);
            alert('Resume submitted successfully!');
            navigate('/BrowseJobs'); // Redirect to browse jobs page
        } catch (err) {
            setError(err.message || 'Failed to submit resume. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="content-block">
                <div className="section-full bg-white submit-resume content-inner-2">
                    <div className="container">
                        <h2>Submit Your Resume</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="col-lg-8 col-md-12">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Your name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea 
                                        className="form-control" 
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Region</label>
                                    <select 
                                        className="form-control"
                                        name="region"
                                        value={formData.region}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Region</option>
                                        {regions.map((region, index) => (
                                            <option key={index} value={region}>{region}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Professional title</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="professionalTitle"
                                        value={formData.professionalTitle}
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
                                    <label>Minimum rate/h (Rs)</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        name="minimumRate"
                                        value={formData.minimumRate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Resume category</label>
                                    <select 
                                        className="form-control"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Design">Design</option>
                                        <option value="Construction">Construction</option>
                                        <option value="Food Service">Food Service</option>
                                        <option value="Customer Service">Customer Service</option>
                                        <option value="Event Management">Event Management</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Skills</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleInputChange}
                                        placeholder="Separate skills with commas"
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
