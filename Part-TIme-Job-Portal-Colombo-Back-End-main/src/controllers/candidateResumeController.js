import * as resumeServices from '../services/resumeServices.js'
import { getUserById } from '../services/userService.js'
import { handleError } from '../utils/handleServerError.js'

export const create = async (req, res) => {
    try {
        const data = req.body
        const existingUser = await getUserById(data.userId)
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' })
        }
        const candidateId = await resumeServices.create(data)
        res.status(201).json({ message: 'Created successfully', candidateId })
    } catch (error) {
        handleError(res, 'Failed to create ', error)
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