import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkUserMiddleware } from "../middlewares/checkUserMiddleware.js";
import {
    create,
    getAll,
    getById,
    getByCandidateId,
    getByJobId,
    update,
    deleteJobApplication
} from "../controllers/jobApplicationController.js";

const router = Router();

router.post('/create', authMiddleware, create);
router.get('/', authMiddleware, getAll);
router.get('/:id', authMiddleware, getById);
router.get('/candidate/:id', authMiddleware, getByCandidateId);
router.get('/job/:id', authMiddleware, getByJobId);
router.patch('/update/:id', authMiddleware, checkUserMiddleware, update);
router.delete('/delete/:id', authMiddleware, checkUserMiddleware, deleteJobApplication);

export default router;