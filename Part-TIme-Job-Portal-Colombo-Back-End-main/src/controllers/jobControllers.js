import { autoApplyForJob } from '../services/autoMatchService.js'
import * as jobServices from '../services/jobServices.js'
import { handleError } from '../utils/handleServerError.js'

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobServices.getAll()
        res.status(200).json(jobs)
    } catch (error) {
        handleError(res, 'Failed to get jobs', error)
    }
}
export const getJobById = async (req, res) => {
    try {
        const job = await jobServices.getById(Number(req.params.id))
        if (!job) {
            return res.status(404).json({ error: 'Job not found' })
        }
        res.status(200).json(job)
    } catch (error) {
        handleError(res, 'Failed to get job', error)
    }
}
export const createJob = async (req, res) => {
    try {
        const jobId = await jobServices.create(req.body)
        await autoApplyForJob(jobId)
        res.status(201).json({ id: jobId })
    } catch (error) {
        handleError(res, 'Failed to create job', error)
    }
}
export const updateJob = async (req, res) => {
    try {
        await jobServices.update(Number(req.params.id), req.body)
        res.status(200).json({ message: 'Job updated successfully' })
    } catch (error) {
        handleError(res, 'Failed to update job', error)
    }
}
export const deleteJob = async (req, res) => {
    try {
        await jobServices.deleteJob(Number(req.params.id))
        res.status(200).json({ message: 'Job deleted successfully' })
    } catch (error) {
        handleError(res, 'Failed to delete job', error)
    }
}
export const getJobsByUserId = async (req, res) => {
    try {
        const jobs = await jobServices.getByUserId(Number(req.params.id))
        if (!jobs) {
            return res.status(404).json({ error: 'No jobs found for this user' })
        }
        res.status(200).json(jobs)
    } catch (error) {
        handleError(res, 'Failed to get jobs by user', error)
    }
}