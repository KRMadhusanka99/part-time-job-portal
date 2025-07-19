import { verifyToken } from "../utils/jwt.js"

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Authorization header missing or invalid" })
    }
    try {
        const token = authHeader.split(' ')[1]
        const user = verifyToken(token)
        req.user = user
        next()
    } catch (error) {
        throw new Error(error)
    }
}