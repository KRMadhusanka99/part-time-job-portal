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
  getAllJobs: () => api.get('/api/job'),
  
  // Get job by ID
  getJobById: (id) => api.get(`/api/job/${id}`),
  
  // Get jobs by user ID (employer's jobs)
  getJobsByUserId: (userId) => api.get(`/api/job/user/${userId}`),
  
  // Create new job
  createJob: (jobData) => api.post('/api/job/create', jobData),
  
  // Update job
  updateJob: (id, jobData) => api.patch(`/api/job/update/${id}`, jobData),
  
  // Delete job
  deleteJob: (id) => api.delete(`/api/job/delete/${id}`),
};

// Job application related API calls
export const jobApplicationAPI = {
  // Create job application
  createApplication: (applicationData) => api.post('/api/application/create', applicationData),
  
  // Get all applications
  getAllApplications: () => api.get('/api/application'),
  
  // Get application by ID
  getApplicationById: (id) => api.get(`/api/application/${id}`),
  
  // Get applications by candidate ID
  getApplicationsByCandidateId: (candidateId) => api.get(`/api/application/candidate/${candidateId}`),
  
  // Get applications by job ID
  getApplicationsByJobId: (jobId) => api.get(`/api/application/job/${jobId}`),
  
  // Update application
  updateApplication: (id, applicationData) => api.patch(`/api/application/update/${id}`, applicationData),
  
  // Delete application
  deleteApplication: (id) => api.delete(`/api/application/delete/${id}`),
};

// Resume related API calls
export const resumeAPI = {
  // Create resume
  createResume: (resumeData) => api.post('/api/resume/create', resumeData),
  
  // Get all resumes
  getAllResumes: () => api.get('/api/resume'),
  
  // Get resume by ID
  getResumeById: (id) => api.get(`/api/resume/${id}`),
  
  // Get resume by user ID
  getResumeByUserId: (userId) => api.get(`/api/resume/user/${userId}`),
  
  // Update resume
  updateResume: (id, resumeData) => api.patch(`/api/resume/update/${id}`, resumeData),
  
  // Delete resume
  deleteResume: (id) => api.delete(`/api/resume/delete/${id}`),
};

// Admin related API calls
export const adminAPI = {
  getAllRoles: () => api.get('/api/admin/roles'),
  getAllAgeGroups: () => api.get('/api/admin/ages'),
  getAllRegions: () => api.get('/api/admin/regions'),
  getAllJobTitles: () => api.get('/api/admin/jobs'),
};

export default api; 