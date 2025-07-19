import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Update this with your backend URL

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Job related API calls
export const jobAPI = {
  // Get all jobs
  getAllJobs: () => api.get('/jobs'),
  
  // Get job by ID
  getJobById: (id) => api.get(`/jobs/${id}`),
  
  // Get jobs by user ID (employer's jobs)
  getJobsByUserId: (userId) => api.get(`/jobs/user/${userId}`),
  
  // Create new job
  createJob: (jobData) => api.post('/jobs/create', jobData),
  
  // Update job
  updateJob: (id, jobData) => api.patch(`/jobs/update/${id}`, jobData),
  
  // Delete job
  deleteJob: (id) => api.delete(`/jobs/delete/${id}`),
};

// Job application related API calls
export const jobApplicationAPI = {
  // Create job application
  createApplication: (applicationData) => api.post('/job-applications/create', applicationData),
  
  // Get all applications
  getAllApplications: () => api.get('/job-applications'),
  
  // Get application by ID
  getApplicationById: (id) => api.get(`/job-applications/${id}`),
  
  // Get applications by candidate ID
  getApplicationsByCandidateId: (candidateId) => api.get(`/job-applications/candidate/${candidateId}`),
  
  // Get applications by job ID
  getApplicationsByJobId: (jobId) => api.get(`/job-applications/job/${jobId}`),
  
  // Update application
  updateApplication: (id, applicationData) => api.patch(`/job-applications/update/${id}`, applicationData),
  
  // Delete application
  deleteApplication: (id) => api.delete(`/job-applications/delete/${id}`),
};

// Admin related API calls
export const adminAPI = {
  getAllRoles: () => api.get('/admin/roles'),
  getAllAgeGroups: () => api.get('/admin/ages'),
  getAllRegions: () => api.get('/admin/regions'),
  getAllJobTitles: () => api.get('/admin/jobs'),
};

export default api; 