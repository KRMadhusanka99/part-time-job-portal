import * as resumeServices from '../services/resumeServices.js'
import { getUserById } from '../services/userService.js'
import { handleError } from '../utils/handleServerError.js'

export const create = async (req, res) => {
    try {
        const data = req.body;
        
        // Convert numeric fields to proper types
        const formattedData = {
            description: data.description,
            minRate: data.minRate ? parseFloat(data.minRate) : null,
            experience: data.experience ? parseFloat(data.experience) : null,
            skills: typeof data.skills === 'string' ? JSON.parse(data.skills) : data.skills,
            userId: parseInt(data.userId),
            regionId: parseInt(data.regionId),
            ageId: parseInt(data.ageId),
            jobTitleId: parseInt(data.jobTitleId),
            // Handle photo field
            photo: null // We'll handle file upload separately later
        };

        const existingUser = await getUserById(formattedData.userId);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const candidateId = await resumeServices.create(formattedData);
        res.status(201).json({ message: 'Created successfully', candidateId });
    } catch (error) {
        console.error('Resume creation error:', error);
        handleError(res, 'Failed to create resume', error);
    }
}

export const getAll = async (req, res) => {
    try {
        const all = await resumeServices.getAll()
        res.status(200).json(all)
    } catch (error) {
        handleError(res, 'Failed to get all', error)
    }
}

export const getById = async (req, res) => {
    try {
        const { id } = req.params
        const resume = await resumeServices.getById(Number(id))
        if (!resume) {
            res.status(404).json({ message: "resume Not Found" })
            return
        }
        res.status(200).json(resume)
    } catch (error) {
        handleError(res, 'Failed to get resume', error)
    }
}

export const getByUserId = async (req, res) => {
    try {
        const { id } = req.params
        const resume = await resumeServices.getByUserId(Number(id))
        if (!resume) {
            res.status(404).json({ message: "resume Not Found" })
            return
        }
        res.status(200).json(resume)
    } catch (error) {
        handleError(res, 'Failed to get resume', error)
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const resume = await resumeServices.getById(Number(id))
        if (!resume) {
            res.status(404).json({ message: "resume Not Found" })
            return
        }
        await resumeServices.update(Number(id), data)
        res.status(201).json({ message: "resume Updated" })
    } catch (error) {
        handleError(res, 'Failed to update resume', error)
    }
}

export const deleteResume = async (req, res) => {
    try {
        const { id } = req.params
        const resume = await resumeServices.getById(Number(id))
        if (!resume) {
            res.status(404).json({ message: "resume Not Found" })
            return
        }
        await resumeServices.deleteResume(Number(id))
        res.status(201).json({ message: "resume Deleted" })
    } catch (error) {
        handleError(res, 'Failed to update resume', error)
    }
}