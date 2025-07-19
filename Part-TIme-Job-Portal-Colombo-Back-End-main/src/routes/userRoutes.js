import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkUserMiddleware } from "../middlewares/checkUserMiddleware.js";

const router = Router()

router.post('/register', createUser)
router.get('/', authMiddleware, getAllUsers)
router.get('/:id', authMiddleware, getUserById)
router.patch('/update/:id', authMiddleware, checkUserMiddleware, updateUser)
router.delete('/delete/:id', authMiddleware, checkUserMiddleware, deleteUser)

export default router;