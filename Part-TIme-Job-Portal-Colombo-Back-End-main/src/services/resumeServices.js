import prisma from "../config/db.js";

export const create = async (data) => {
    // Format the data to match Prisma schema
    const formattedData = {
        description: data.description,
        minRate: data.minRate ? parseFloat(data.minRate) : null,
        experience: data.experience ? parseFloat(data.experience) : null,
        photo: data.photo && typeof data.photo === 'string' ? data.photo : null,
        skills: data.skills,
        userId: parseInt(data.userId),
        regionId: parseInt(data.regionId),
        jobTitleId: parseInt(data.jobTitleId),
        ageId: parseInt(data.ageId)
    };

    // Remove any undefined or empty object values
    Object.keys(formattedData).forEach(key => {
        if (formattedData[key] === undefined || 
            (typeof formattedData[key] === 'object' && !Array.isArray(formattedData[key]) && !formattedData[key])) {
            formattedData[key] = null;
        }
    });

    const newResume = await prisma.candidateResume.create({ 
        data: formattedData 
    });
    return newResume.id;
}

export const getAll = async () => {
    return await prisma.candidateResume.findMany()
}

export const getById = async (id) => {
    return await prisma.candidateResume.findUnique({ where: { id: id } })
}

export const getByUserId = async (id) => {
    return await prisma.candidateResume.findUnique({ where: { userId: id } })
}

export const update = async (id, data) => {
    // Format the data to match Prisma schema
    const formattedData = {
        description: data.description,
        minRate: data.minRate ? parseFloat(data.minRate) : undefined,
        experience: data.experience ? parseFloat(data.experience) : undefined,
        photo: data.photo && typeof data.photo === 'string' ? data.photo : undefined,
        skills: data.skills,
        regionId: data.regionId ? parseInt(data.regionId) : undefined,
        jobTitleId: data.jobTitleId ? parseInt(data.jobTitleId) : undefined,
        ageId: data.ageId ? parseInt(data.ageId) : undefined
    };

    // Remove undefined fields and empty objects
    Object.keys(formattedData).forEach(key => {
        if (formattedData[key] === undefined || 
            (typeof formattedData[key] === 'object' && !Array.isArray(formattedData[key]) && !formattedData[key])) {
            delete formattedData[key];
        }
    });

    await prisma.candidateResume.update({ 
        where: { id: id }, 
        data: formattedData 
    });
}

export const deleteResume = async (id) => {
    await prisma.candidateResume.delete({ where: { id: id } })
}