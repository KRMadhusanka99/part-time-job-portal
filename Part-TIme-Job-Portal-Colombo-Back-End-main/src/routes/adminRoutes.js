import { Router } from "express";
import { getAllAgeGroups, getAllJobTitles, getAllRegions, getAllRoles } from "../controllers/adminControllers.js";

const router = Router();

router.get('/roles', getAllRoles)
router.get('/ages', getAllAgeGroups)
router.get('/regions', getAllRegions)
router.get('/jobs', getAllJobTitles)

export default router;