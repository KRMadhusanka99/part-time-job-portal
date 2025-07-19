import prisma from "../config/db.js";

export const create = async (data) => {
    const newResume = await prisma.candidateResume.create({ data: { ...data } })
    return newResume.id
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
    await prisma.candidateResume.update({ where: { id: id }, data: data })
}

export const deleteResume = async (id) => {
    await prisma.candidateResume.delete({ where: { id: id } })
}