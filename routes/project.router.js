import { Router } from "express";

import * as controller from "../controllers/project.controller.js";

import auth from "@/middleware/crmAuth.js";


const router = Router();

router.get('/list', controller.listProject);

router.post('/', controller.addProject);

router.put('/', controller.updateProject);

router.delete('/', auth({ master: true }), controller.deleteProject);

export default router;