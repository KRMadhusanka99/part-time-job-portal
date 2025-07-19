import { comparePassword } from "../utils/bcrypt.js";
import { generatedToken } from "../utils/jwt.js";
import { handleError } from "../utils/handleServerError.js";
import { getUserByEmail, getUserById } from "../services/userService.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email)
        if (!user) {
            res.status(401).json({ message: "Invalid email" });
            return;
        }
        const isValidPassword = await comparePassword(password, user.password)
        if (!isValidPassword) {
            res.status(401).json({ message: "Invalid password" });
            return;
        }
        const payload = {
            userId: user.id,
            role: user.roleId
        }
        const sendUserData = await getUserById(user.id)
        const token = generatedToken(payload)
        res.status(200).json({ token: token, user: sendUserData })
    } catch (error) {
        console.log(error)
        handleError(res, 'Failed to login', error)
    }
}