import prisma from "../config/db.js";

export const createUser = async (user) => {
    const newUser = await prisma.user.create({
        data: user
    })
    return newUser.id;
}

export const getUserById = async (id) => {
    return await prisma.user.findUnique({
        where: { id: id },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            roleId: true,
            createdAt: true
        }
    })
}

export const getUserByEmail = async (email) => {
    return await prisma.user.findUnique({ where: { email: email } })
}

export const getAllUsers = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            roleId: true,
            createdAt: true
        }
    })
}

export const updateUser = async (id, data) => {
    await prisma.user.update({ where: { id: id }, data: data })
}

export const deleteUser = async (id) => {
    await prisma.user.delete({ where: { id: id } })
}