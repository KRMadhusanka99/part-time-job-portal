// components/JobCard.jsx
import React, { useState } from "react";
import { jobApplicationAPI } from '../services/api';

const JobCard = ({ job, modalId }) => {
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState(null);

  const handleApply = async () => {
    setApplying(true);
    setError(null);

    try {
      // Get user ID from localStorage (assuming it's stored during login)
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('Please login to apply for jobs');
      }

      const applicationData = {
        jobId: job._id,
        candidateId: userId,
        status: 'pending'
      };

      await jobApplicationAPI.createApplication(applicationData);
      alert('Application submitted successfully!');
    } catch (err) {
      setError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  return (
    <li>
      <div className="d-flex m-b30">
        <div className="job-post-company">
          <span><img src={job.photo || '/assets/images/logo/default-job.png'} alt={job.title} /></span>
        </div>
        <div className="job-post-info">
          <h4>{job.title}</h4>
          <ul>
            <li><i className="fa fa-map-marker"></i> {job.employer}</li>
            <li><i className="fa fa-bookmark-o"></i> {job.location}</li>
            <li><i className="fa fa-clock-o"></i> Deadline: {new Date(job.deadline).toLocaleDateString()}</li>
          </ul>
        </div>
      </div>

      <div className="d-flex">
        <div className="job-time mr-auto">
          <span>Rs. {job.salary}</span>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target={`#${modalId}`}
        >
          View More <i className="ri-hand-heart-fill"></i>
        </button>

        <div className="modal fade" id={modalId} tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered mt-5 pt-5">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title">Job Opportunity</h5>
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
                      src={job.photo || '/assets/images/logo/default-job.png'}
                      alt={job.title}
                      className="img-fluid rounded shadow-sm"
                    />
                  </div>

                  <div className="col-md-8">
                    <h4 className="fw-bold">{job.title}</h4>

                    <div className="row">
                      <div className="col-md-6">
                        <ul className="mb-3">
                          <li><strong>Employer:</strong> {job.employer}</li>
                          <li><strong>Role:</strong> {job.role}</li>
                          <li><strong>Location:</strong> {job.location}</li>
                          <li><strong>Salary:</strong> Rs. {job.salary}</li>
                        </ul>
                      </div>

                      <div className="col-md-6">
                        <ul className="mb-3">
                          <li><strong>Age Group:</strong> {job.ageGroup}</li>
                          <li><strong>Experience:</strong> {job.experience}</li>
                          <li><strong>Education:</strong> {job.education}</li>
                          <li><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</li>
                        </ul>
                      </div>
                    </div>

                    <div className="text-muted small">
                      <p>{job.description}</p>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}
                  </div>
                </div>
              </div>

              <div className="modal-footer border-0">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleApply}
                  disabled={applying}
                >
                  {applying ? 'Applying...' : 'Apply Now'}
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
    </li>
  );
};

export default JobCard;
