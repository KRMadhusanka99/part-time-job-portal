import { Router } from "express";
import { create, deleteResume, getAll, getById, getByUserId, update } from "../controllers/candidateResumeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkUserMiddleware } from "../middlewares/checkUserMiddleware.js";

const router = Router()

router.post('/create', create)
router.get('/', authMiddleware, getAll)
router.get('/:id', authMiddleware, getById)
router.get('/user/:id', authMiddleware, getByUserId)
router.patch('/update/:id', authMiddleware, update)
router.delete('/delete/:id', authMiddleware, checkUserMiddleware, deleteResume)

export default router;