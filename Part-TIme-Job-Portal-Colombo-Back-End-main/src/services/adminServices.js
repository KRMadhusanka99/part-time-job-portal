import prisma from "../config/db.js";

export const getAllRoles = async () => {
    return await prisma.role.findMany()
}

export const getAllAgeGroups = async () => {
    return await prisma.ageGroup.findMany()
}

export const getAllJobTitles = async () => {
    return await prisma.jobTitles.findMany()
}

export const getAllRegions = async () => {
    return await prisma.regions.findMany()
}

