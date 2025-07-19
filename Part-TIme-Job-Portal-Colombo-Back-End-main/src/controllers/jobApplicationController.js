import * as jobApplicationServices from '../services/jobApplicationServices.js'
import { getUserById } from '../services/userService.js'
import { handleError } from '../utils/handleServerError.js'

export const create = async (req, res) => {
    try {
        const data = req.body;
        const existingUser = await getUserById(data.candidateId);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        const jobApplicationId = await jobApplicationServices.create(data);
        res.status(201).json({ message: 'Created successfully', jobApplicationId });
    } catch (error) {
        handleError(res, 'Failed to create job application', error);
    }
}

export const getAll = async (req, res) => {
    try {
        const allJobApplications = await jobApplicationServices.getAll();
        res.status(200).json(allJobApplications);
    } catch (error) {
        handleError(res, 'Failed to get all job applications', error);
    }
}

export const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const jobApplication = await jobApplicationServices.getById(Number(id));
        if (!jobApplication) {
            return res.status(404).json({ message: "Job Application Not Found" });
        }
        res.status(200).json(jobApplication);
    } catch (error) {
        handleError(res, 'Failed to get job application', error);
    }
}

export const getByCandidateId = async (req, res) => {
    try {
        const { id } = req.params;
        const jobApplications = await jobApplicationServices.getByCandidateId(Number(id));
        if (!jobApplications) {
            return res.status(404).json({ message: "Job Applications Not Found" });
        }
        res.status(200).json(jobApplications);
    } catch (error) {
        handleError(res, 'Failed to get job applications by candidate ID', error);
    }
}

export const getByJobId = async (req, res) => {
    try {
        const { id } = req.params;
        const jobApplications = await jobApplicationServices.getByJobId(Number(id));
        if (!jobApplications) {
            return res.status(404).json({ message: "Job Applications Not Found" });
        }
        res.status(200).json(jobApplications);
    } catch (error) {
        handleError(res, 'Failed to get job applications by job ID', error);
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const jobApplication = await jobApplicationServices.getById(Number(id));
        if (!jobApplication) {
            return res.status(404).json({ message: "Job Application Not Found" });
        }
        const updatedJobApplication = await jobApplicationServices.updateById(Number(id), data);
        res.status(200).json(updatedJobApplication);
    } catch (error) {
        handleError(res, 'Failed to update job application', error);
    }
}
export const deleteJobApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const jobApplication = await jobApplicationServices.getById(Number(id));
        if (!jobApplication) {
            return res.status(404).json({ message: "Job Application Not Found" });
        }
        await jobApplicationServices.deleteById(Number(id));
        res.status(200).json({ message: "Job Application Deleted Successfully" });
    } catch (error) {
        handleError(res, 'Failed to delete job application', error);
    }
}
