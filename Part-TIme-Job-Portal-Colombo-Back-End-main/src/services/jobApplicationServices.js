import prisma from "../config/db.js";

export const create = async (data) => {
    const newJobApplication = await prisma.jobApplication.create({
        data: { ...data },
    });
    return newJobApplication.id;
};

export const getById = async (id) => {
    const jobApplication = await prisma.jobApplication.findUnique({
        where: { id },
        include: {
            job: {
                include: {
                    jobTitle: true,
                    ageGroup: true,
                    region: true,
                    employer: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                },
            },
            candidate: {
                include: {
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
        }
    });
    return jobApplication;
}

export const getAll = async () => {
    return await prisma.jobApplication.findMany({
        include: {
            job: {
                include: {
                    jobTitle: true,
                    ageGroup: true,
                    region: true,
                    employer: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                },
            },
            candidate: {
                include: {
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
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const deleteById = async (id) => {
    return await prisma.jobApplication.delete({
        where: { id },
    });
}

// Update job application by ID
export const updateById = async (id, data) => {
    return await prisma.jobApplication.update({
        where: { id },
        data: { ...data },
    });
}

// Get all job applications for a specific job
export const getByJobId = async (jobId) => {
    return await prisma.jobApplication.findMany({
        where: { jobId },
        include: {
            candidate: {
                include: {
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
        orderBy: {
            createdAt: "desc",
        },
    });
}


