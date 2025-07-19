
export const checkUserMiddleware = (req, res, next) => {
    try {
        const { id } = req.params
        const user = req.user
        const userId = user.userId
        if (userId !== Number(id)) {
            return res.status(401).json({ message: "Not Authorized" })
        }
        next()
    } catch (error) {
        throw new Error(error)
    }

}