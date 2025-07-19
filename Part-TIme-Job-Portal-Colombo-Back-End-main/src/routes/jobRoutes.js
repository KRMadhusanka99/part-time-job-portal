import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkUserMiddleware } from "../middlewares/checkUserMiddleware.js";
import { createJob, deleteJob, getAllJobs, getJobById, getJobsByUserId, updateJob } from "../controllers/jobControllers.js";

const router = Router()

router.post('/create', createJob)
router.get('/', authMiddleware, getAllJobs)
router.get('/:id', authMiddleware, getJobById)
router.get('/user/:id', authMiddleware, getJobsByUserId)
router.patch('/update/:id', authMiddleware, updateJob)
router.delete('/delete/:id', authMiddleware, checkUserMiddleware, deleteJob)

export default router;