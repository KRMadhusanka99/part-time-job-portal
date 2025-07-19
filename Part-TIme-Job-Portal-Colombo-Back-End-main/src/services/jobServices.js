import prisma from "../config/db.js";

// Create a new job
export const create = async (data) => {
    const newJob = await prisma.job.create({
        data: { ...data },
    });
    return newJob.id;
};

// Get all jobs with related data
export const getAll = async () => {
    return await prisma.job.findMany({
        include: {
            employer: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
            ageGroup: true,
            jobTitle: true,
            region: true,
            jobApplications: {
                select: {
                    id: true,
                    createdAt: true,
                    candidate: {
                        select: {
                            id: true,
                            description: true,
                            user: {
                                select: {
                                    id: true,
                                    firstName: true,
                                    lastName: true,
                                    email: true,
                                },
                            },
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

// Get job by ID with full details
export const getById = async (id) => {
    return await prisma.job.findUnique({
        where: { id },
        include: {
            employer: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
            ageGroup: true,
            jobTitle: true,
            region: true,
            jobApplications: {
                select: {
                    id: true,
                    createdAt: true,
                    candidate: {
                        select: {
                            id: true,
                            user: {
                                select: {
                                    id: true,
                                    firstName: true,
                                    lastName: true,
                                },
                            },
                            experience: true,
                            minRate: true,
                        },
                    },
                },
            },
        },
    });
};

// Get all jobs posted by a specific user
export const getByUserId = async (userId) => {
    return await prisma.job.findMany({
        where: { employerId: userId },
        include: {
            ageGroup: true,
            jobTitle: true,
            region: true,
            jobApplications: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

// Update job by ID
export const update = async (id, data) => {
    return await prisma.job.update({
        where: { id },
        data,
    });
};

// Delete job by ID
export const deleteJob = async (id) => {
    return await prisma.job.delete({
        where: { id },
    });
};
