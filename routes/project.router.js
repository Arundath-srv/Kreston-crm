import { Router } from "express";

import * as controller from "../controllers/project.controller.js";

import auth from "@/middleware/crmAuth.js";


const router = Router();

router.get('/list', auth({ common: true }), controller.listProject);

router.post('/', auth({ common: true }), controller.addProject);

router.put('/', auth({ common: true }), controller.updateProject);

router.delete('/', auth({ master: true }), controller.deleteProject);

router.put("/project-status", controller.updateProjectStatus);

router.put("/fee-status", controller.updateFeeStatus);

export default router;