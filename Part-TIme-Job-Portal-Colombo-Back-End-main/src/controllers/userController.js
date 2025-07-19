import * as userServices from '../services/userService.js'
import { hashPassword } from '../utils/bcrypt.js'
import { handleError } from '../utils/handleServerError.js'

export const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, roleId } = req.body
        const existingUser = await userServices.getUserByEmail(email)
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' })
        }
        const hashedPassword = await hashPassword(password)
        const userId = await userServices.createUser({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            roleId: roleId
        })
        res.status(201).json({ message: 'User created successfully', userId })
    } catch (error) {
        handleError(res, 'Failed to create user', error)
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await userServices.getAllUsers()
        res.status(200).json(users)
    } catch (error) {
        handleError(res, 'Failed to get users', error)
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await userServices.getUserById(Number(id))
        if (!user) {
            res.status(404).json({ message: "User Not Found" })
            return
        }
        res.status(200).json(user)
    } catch (error) {
        handleError(res, 'Failed to get user', error)
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const user = await userServices.getUserById(Number(id))
        if (!user) {
            res.status(404).json({ message: "User Not Found" })
            return
        }
        if (data.email && data.email !== user.email) {
            const emailTaken = await userServices.getUserByEmail(data.email)
            if (emailTaken) {
                res.status(400).json({ message: "Email already taken" })
                return
            }
        }
        if (data.password) {
            data.password = await hashPassword(data.password);
        }
        await userServices.updateUser(Number(id), data)
        res.status(201).json({ message: "User Updated" })
    } catch (error) {
        handleError(res, 'Failed to update user', error)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await userServices.getUserById(Number(id))
        if (!user) {
            res.status(404).json({ message: "User Not Found" })
            return
        }
        await userServices.deleteUser(Number(id))
        res.status(201).json({ message: "User Deleted" })

    } catch (error) {
        handleError(res, 'Failed to update user', error)
    }
}