import prisma from "../config/db.js";

export const autoApplyForJob = async (jobId) => {
    const job = await prisma.job.findUnique({
        where: { id: jobId },
        include: {
            jobTitle: true,
            region: true,
            ageGroup: true,
        },
    });

    if (!job) return;

    // Find suitable candidates
    const candidates = await prisma.candidateResume.findMany({
        where: {
            jobTitleId: job.jobTitleId,
            regionId: job.regionId,
            experience: {
                gte: job.experience,
            },
            minRate: {
                lte: job.rate,
            },
        },
        include: {
            user: true,
        },
    });

    for (const candidate of candidates) {
        const alreadyApplied = await prisma.jobApplication.findFirst({
            where: {
                jobId: job.id,
                candidateId: candidate.id,
            },
        });

        if (!alreadyApplied) {
            await prisma.jobApplication.create({
                data: {
                    jobId: job.id,
                    candidateId: candidate.id,
                },
            });
        }
    }
};
