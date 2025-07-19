import React, { useState, useEffect } from 'react';
import { adminAPI, resumeAPI } from './services/api';
import { useNavigate } from 'react-router-dom';

export const CandidateForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        regionId: '',
        professionalTitle: '',
        experience: '',
        photo: null,
        minimumRate: '',
        jobTitleId: '',
        ageId: '',
        skills: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [regions, setRegions] = useState([]);
    const [jobTitles, setJobTitles] = useState([]);
    const [ageGroups, setAgeGroups] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [regionsRes, jobTitlesRes, ageGroupsRes] = await Promise.all([
                    adminAPI.getAllRegions(),
                    adminAPI.getAllJobTitles(),
                    adminAPI.getAllAgeGroups()
                ]);
                setRegions(regionsRes.data);
                setJobTitles(jobTitlesRes.data);
                setAgeGroups(ageGroupsRes.data);
            } catch (err) {
                console.error('Failed to fetch data:', err);
                setError('Failed to load form data. Please try again later.');
            }
        };
        fetchData();
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
            // Get user ID from localStorage
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('Please login to submit your resume');
            }

            // Create FormData object for file upload
            const resumeData = new FormData();
            
            // Add all form fields
            const dataToSend = {
                ...formData,
                userId: parseInt(userId),
                regionId: parseInt(formData.regionId),
                ageId: parseInt(formData.ageId),
                jobTitleId: parseInt(formData.jobTitleId),
                experience: parseFloat(formData.experience),
                minimumRate: parseFloat(formData.minimumRate),
                skills: formData.skills.split(',').map(skill => skill.trim()) // Convert skills string to array
            };

            // Append all data to FormData
            for (const key in dataToSend) {
                if (dataToSend[key] !== null && dataToSend[key] !== undefined) {
                    if (key === 'photo') {
                        if (dataToSend[key]) {
                            resumeData.append(key, dataToSend[key]);
                        }
                    } else {
                        resumeData.append(key, 
                            typeof dataToSend[key] === 'object' 
                                ? JSON.stringify(dataToSend[key]) 
                                : dataToSend[key]
                        );
                    }
                }
            }

            await resumeAPI.createResume(resumeData);
            alert('Resume submitted successfully!');
            navigate('/browsejobs');
        } catch (err) {
            console.error('Error submitting resume:', err);
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
                                    <label>Professional Title</label>
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
                                    <label>Description</label>
                                    <textarea 
                                        className="form-control" 
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Describe your experience and qualifications"
                                    ></textarea>
                                </div>
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
                                <div className="form-group">
                                    <label>Experience (years)</label>
                                    <input 
                                        type="number" 
                                        step="0.1"
                                        className="form-control" 
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
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
                                    <label>Minimum Rate/h (Rs)</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        name="minimumRate"
                                        value={formData.minimumRate}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Skills (comma-separated)</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Customer Service, Communication, Time Management"
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
