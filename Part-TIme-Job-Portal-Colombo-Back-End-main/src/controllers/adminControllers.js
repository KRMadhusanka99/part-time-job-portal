import * as adminServices from '../services/adminServices.js'
import { handleError } from '../utils/handleServerError.js'

export const getAllRoles = async (req, res) => {
    try {
        const roles = await adminServices.getAllRoles()
        res.status(200).json(roles)
    } catch (error) {
        handleError(res, 'Failed to get roles', error)
    }
}

export const getAllAgeGroups = async (req, res) => {
    try {
        const ageGroups = await adminServices.getAllAgeGroups()
        res.status(200).json(ageGroups)
    } catch (error) {
        handleError(res, 'Failed to get age groups', error)
    }
}

export const getAllJobTitles = async (req, res) => {
    try {
        const jobTitles = await adminServices.getAllJobTitles()
        res.status(200).json(jobTitles)
    } catch (error) {
        handleError(res, 'Failed to get job titles', error)
    }
}

export const getAllRegions = async (req, res) => {
    try {
        const regions = await adminServices.getAllRegions()
        res.status(200).json(regions)
    } catch (error) {
        handleError(res, 'Failed to get regions', error)
    }
}